import api from "@/admin/Api/api";
import toastMessage from "@/admin/utils/functions";
import { __ } from "@wordpress/i18n";

// La version free n'autorise qu'une seule configuration (limite aussi appliquée côté API).
export const MAX_FREE_CONFIGS = 1;

export const isConfigLimitReached = (totalConfigs) => Number(totalConfigs || 0) >= MAX_FREE_CONFIGS;

export const fetchConfigLimitReached = async () => {
  const res = await api.getConfigs("?per_page=1&page=1");
  return isConfigLimitReached(res?.totalConfigsFound);
};

export const showConfigLimitToast = () => {
  toastMessage(
    __("Only one configuration is allowed in the free version. Upgrade to Pro to create more.", "all-signs-customizer-for-woocommerce"),
    "warning"
  );
};
