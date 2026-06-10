# Audit Fonts - PowerShell Script
# Uses curl.exe to test REST API endpoints

param(
    [int]$ConfigId = 400
)

$BASE = "http://localhost/wordpressWork/wp-json/asowp/v1"
$FONTS_URL = "$BASE/configs/$ConfigId/required-options/fonts"

function Show-Json($label, $json) {
    Write-Host "`n=== $label ===" -ForegroundColor Cyan
    $json | ConvertFrom-Json | ConvertTo-Json -Depth 10 | Write-Host
}

function Get-MetaDirect([int]$configId) {
    # We can't directly read post_meta from CLI PHP, so we use the configs endpoint
    $resp = curl.exe -s "$BASE/configs/$ConfigId"
    return $resp | ConvertFrom-Json
}

Write-Host "========================================" -ForegroundColor Green
Write-Host "   AUDIT FONTS - CONFIG #$ConfigId" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Step 1: Read current state via REST
Write-Host "`n[1] READING CURRENT STATE VIA REST" -ForegroundColor Yellow
$fontsGet = curl.exe -s $FONTS_URL | ConvertFrom-Json
Show-Json "GET fonts response" ($fontsGet | ConvertTo-Json)

# Step 2: Save original state for restore later
Write-Host "`n[2] SAVING ORIGINAL STATE" -ForegroundColor Yellow
$originalConfig = curl.exe -s "$BASE/configs/$ConfigId" | ConvertFrom-Json
$originalFontsLabel = $fontsGet.data.fonts.label
$originalFontsDesc = $fontsGet.data.fonts.description
$originalItems = $fontsGet.data.fonts.fontItems
$originalItemIds = $fontsGet.data.fonts.items
Write-Host "  Original label: $originalFontsLabel"
Write-Host "  Original items count: $($originalItems.Count)"

# Test 1: UPDATE section label and description (PUT)
Write-Host "`n[3] TEST PUT - Update label & description" -ForegroundColor Yellow
$testLabel = "Fonts Audit Test $(Get-Date -Format 'HH:mm:ss')"
$testDesc = "Audit description from script"
$putBody = @{
    label = $testLabel
    description = $testDesc
    items = $originalItems | ForEach-Object {
        @{
            managedFontId = $_.managedFontId
            isDefault = $_.isDefault
        }
    }
} | ConvertTo-Json -Depth 5

Write-Host "  Sending PUT with label: $testLabel"
$putResp = curl.exe -s -X PUT $FONTS_URL -H "Content-Type: application/json" -d $putBody | ConvertFrom-Json
Show-Json "PUT response" ($putResp | ConvertTo-Json)

# Verify by re-reading
$verifyPut = curl.exe -s $FONTS_URL | ConvertFrom-Json
$labelAfterPut = $verifyPut.data.fonts.label
$descAfterPut = $verifyPut.data.fonts.description
Write-Host "`n  Verification:"
Write-Host "  Label: $labelAfterPut (expected: $testLabel)" -ForegroundColor $(if($labelAfterPut -eq $testLabel){"Green"}else{"Red"})

# Also verify in the full config JSON
$configAfterPut = curl.exe -s "$BASE/configs/$ConfigId" | ConvertFrom-Json
$fontsInConfig = $configAfterPut.requiredOptions.fonts
Write-Host "  In full config JSON: label=$(if($fontsInConfig.label -eq $testLabel){"OK"}else{"MISMATCH"}), description=$(if($fontsInConfig.description -eq $testDesc){"OK"}else{"MISMATCH"})"

# Test 2: ADD a font item (POST)
Write-Host "`n[4] TEST POST - Add a font item" -ForegroundColor Yellow
# Get managed fonts
$managedFonts = curl.exe -s "$BASE/manage-fonts" | ConvertFrom-Json
$existingIds = $verifyPut.data.fonts.items
$newFont = $null
foreach ($mf in $managedFonts) {
    $idx = [array]::IndexOf($managedFonts, $mf)
    if ($existingIds -notcontains $idx) {
        $newFont = @{id = $idx; label = $mf.label}
        break
    }
}
if (-not $newFont -and $managedFonts.Count -gt 0) {
    $newFont = @{id = 0; label = $managedFonts[0].label}
}
if ($newFont) {
    Write-Host "  Adding font ID $($newFont.id): $($newFont.label)"
    $addBody = @{font_id = $newFont.id} | ConvertTo-Json
    $addResp = curl.exe -s -X POST "$FONTS_URL/items" -H "Content-Type: application/json" -d $addBody | ConvertFrom-Json
    Show-Json "POST add response" ($addResp | ConvertTo-Json)
    
    # Verify
    $verifyAdd = curl.exe -s $FONTS_URL | ConvertFrom-Json
    $itemsAfterAdd = $verifyAdd.data.fonts.items
    Write-Host "  Items count after add: $($itemsAfterAdd.Count) (was $($existingIds.Count))" -ForegroundColor $(if($itemsAfterAdd.Count -gt $existingIds.Count){"Green"}else{"Red"})
    $found = $itemsAfterAdd -contains $newFont.id
    Write-Host "  New font ID $($newFont.id) found: $found" -ForegroundColor $(if($found){"Green"}else{"Red"})
}

# Test 3: REORDER font item (PUT item)
Write-Host "`n[5] TEST PUT ITEM - Reorder" -ForegroundColor Yellow
$verifyReorder = curl.exe -s $FONTS_URL | ConvertFrom-Json
$itemsBeforeReorder = $verifyReorder.data.fonts.items
if ($itemsBeforeReorder.Count -ge 2) {
    $moveIndex = 0
    $targetPos = $itemsBeforeReorder.Count - 1
    Write-Host "  Moving item index $moveIndex to position $targetPos"
    $reorderBody = @{position = $targetPos} | ConvertTo-Json
    $reorderResp = curl.exe -s -X PUT "$FONTS_URL/items/$moveIndex" -H "Content-Type: application/json" -d $reorderBody | ConvertFrom-Json
    Show-Json "PUT reorder response" ($reorderResp | ConvertTo-Json)
    
    $verifyReorder2 = curl.exe -s $FONTS_URL | ConvertFrom-Json
    $itemsAfterReorder = $verifyReorder2.data.fonts.items
    Write-Host "  Items count unchanged: $(if($itemsAfterReorder.Count -eq $itemsBeforeReorder.Count){"OK"}else{"CHANGED!"})"
}

# Test 4: SET DEFAULT (PUT item/default)
Write-Host "`n[6] TEST PUT DEFAULT" -ForegroundColor Yellow
$verifyDef = curl.exe -s $FONTS_URL | ConvertFrom-Json
$itemsForDef = $verifyDef.data.fonts.items
if ($itemsForDef.Count -ge 2) {
    $defaultIdx = $itemsForDef.Count - 1
    Write-Host "  Setting item index $defaultIdx as default"
    $defaultResp = curl.exe -s -X PUT "$FONTS_URL/items/$defaultIdx/default" -H "Content-Type: application/json" -d "{}" | ConvertFrom-Json
    Show-Json "PUT default response" ($defaultResp | ConvertTo-Json)
    
    $verifyDef2 = curl.exe -s $FONTS_URL | ConvertFrom-Json
    $itemsAfterDefault = $verifyDef2.data.fonts.fontItems
    $defaultFound = $false
    foreach ($item in $itemsAfterDefault) {
        if ($item.isDefault) {
            Write-Host "  Default item: $(if($itemsAfterDefault.IndexOf($item) -eq $defaultIdx){"Correct index"}else{"WRONG index"}) - $($item.label)"
            $defaultFound = $true
        }
    }
    Write-Host "  Default found: $(if($defaultFound){"YES"}else{"NO - BUG!"})"
}

# Test 5: DELETE font item
Write-Host "`n[7] TEST DELETE - Remove font item" -ForegroundColor Yellow
$verifyDel = curl.exe -s $FONTS_URL | ConvertFrom-Json
$itemsBeforeDel = $verifyDel.data.fonts.items
$countBefore = $itemsBeforeDel.Count
if ($countBefore -ge 1) {
    $delIdx = $countBefore - 1
    $deletedId = $itemsBeforeDel[$delIdx]
    Write-Host "  Deleting item index $delIdx (ID: $deletedId)"
    $delResp = curl.exe -s -X DELETE "$FONTS_URL/items/$delIdx" -H "Content-Type: application/json" | ConvertFrom-Json
    Show-Json "DELETE response" ($delResp | ConvertTo-Json)
    
    $verifyDel2 = curl.exe -s $FONTS_URL | ConvertFrom-Json
    $itemsAfterDel = $verifyDel2.data.fonts.items
    Write-Host "  Count before: $countBefore, after: $($itemsAfterDel.Count)" -ForegroundColor $(if($itemsAfterDel.Count -lt $countBefore){"Green"}else{"Red"})
    $stillPresent = $itemsAfterDel -contains $deletedId
    Write-Host "  Deleted ID still present: $(if($stillPresent){"YES - BUG!"}else{"NO - OK"})"
}

# Test 6: Check JSON structure in full config
Write-Host "`n[8] JSON STRUCTURE CHECK IN FULL CONFIG" -ForegroundColor Yellow
$finalConfig = curl.exe -s "$BASE/configs/$ConfigId" | ConvertFrom-Json
$isObject = ($finalConfig.PSObject.Properties.Name -contains "id") -or ($finalConfig -is [PSCustomObject])
Write-Host "  Root is object (not array): $(if($isObject){"YES"}else{"NO - BUG!"})"
Write-Host "  'data' field: $(if($null -ne $finalConfig.data){"PRESENT - BUG!"}else{"not present - OK"})"
Write-Host "  'requiredOptions' field: $(if($null -ne $finalConfig.requiredOptions){"YES"}else{"NO"})"
Write-Host "  'requiredOptions.fonts' field: $(if($null -ne $finalConfig.requiredOptions.fonts){"YES"}else{"NO"})"
if ($finalConfig.requiredOptions.fonts) {
    Write-Host "  'requiredOptions.fonts.items' is array: $(if($finalConfig.requiredOptions.fonts.items -is [array]){"YES"}else{"NO - BUG!"})"
    Write-Host "  Items count: $($finalConfig.requiredOptions.fonts.items.Count)"
    
    # Check if items have correct structure (fontItems from REST full config may not exist)
    # Check customizerSign sync
    $customizerText = $finalConfig.settings.customizerSign.text
    Write-Host "`n  customizerSign.text sync:"
    Write-Host "    selectedFonts present: $(if($null -ne $customizerText.selectedFonts){"YES"}else{"NO"})"
    Write-Host "    fontsLabel: $($customizerText.fontsLabel)"
    Write-Host "    fontsDescription: $($customizerText.fontsDescription)"
}

# Step 9: CHECK OUTPUT endpoint
Write-Host "`n[9] CHECK getRequiredOptionFonts response shape" -ForegroundColor Yellow
$fontsLastGet = curl.exe -s $FONTS_URL | ConvertFrom-Json
Write-Host "  success: $($fontsLastGet.success)"
Write-Host "  data.fonts.label: $($fontsLastGet.data.fonts.label)"
Write-Host "  data.fonts.description: $($fontsLastGet.data.fonts.description)"
Write-Host "  data.fonts.items (IDs array): $($fontsLastGet.data.fonts.items.Count) items"
Write-Host "  data.fonts.fontItems (objects): $($fontsLastGet.data.fonts.fontItems.Count) items"

# Restore original state
Write-Host "`n[10] RESTORE ORIGINAL STATE" -ForegroundColor Yellow
$restoreBody = @{
    label = $originalFontsLabel
    description = $originalFontsDesc
    items = $originalItems | ForEach-Object {
        @{
            managedFontId = $_.managedFontId
            isDefault = $_.isDefault
        }
    }
} | ConvertTo-Json -Depth 5

$restoreResp = curl.exe -s -X PUT $FONTS_URL -H "Content-Type: application/json" -d $restoreBody | ConvertFrom-Json
Write-Host "  Restore response: success=$($restoreResp.success)"

# Final verification
$verifyFinal = curl.exe -s $FONTS_URL | ConvertFrom-Json
Write-Host "  Final items count: $($verifyFinal.data.fonts.items.Count) (expected: $($originalItemIds.Count))"
Write-Host "  Original items restored: $(if($verifyFinal.data.fonts.items.Count -eq $originalItemIds.Count){"YES"}else{"NO - Check manually!"})"

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "   AUDIT FONTS COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
