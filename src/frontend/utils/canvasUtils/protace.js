/* eslint-disable no-constant-condition */

/*
 * JavaScript port of Potrace (http://potrace.sourceforge.net).
 * Based on: https://github.com/oov/potrace
 *
 * LICENSE: GPL v2
 *
 * Copyright (C) 2001-2013 Peter Selinger.
 * Copyright (C) 2014-2016 kilobtye.
 * Copyright (C) 2016 Oov.
 */

const TurnPolicy = {
  Right: 0,
  Black: 1,
  White: 2,
  Majority: 3,
  Minority: 4
};

const CurveTag = {
  Curve: 0,
  Corner: 1
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  copy() {
    return new Point(this.x, this.y);
  }
}

class Bitmap {
  static createFromImage(src) {
    const ctx = document.createElement("canvas").getContext("2d");
    const bm = new Bitmap(src.width, src.height);

    if (!ctx) {
      throw new Error("Unable to construct canvas");
    }

    ctx.canvas.width = src.width;
    ctx.canvas.height = src.height;
    ctx.drawImage(src, 0, 0);

    const data = ctx.getImageData(0, 0, bm.width, bm.height).data;
    for (let i = 0, j = 0, l = data.length; i < l; i += 4, ++j) {
      bm.data[j] = 0.2126 * data[i] + 0.7153 * data[i + 1] + 0.0721 * data[i + 2] < 128 ? 1 : 0;
    }

    return bm;
  }

  static createFromImageAlpha(src) {
    const ctx = document.createElement("canvas").getContext("2d");
    const bm = new Bitmap(src.width, src.height);

    if (!ctx) {
      throw new Error("Unable to construct canvas");
    }

    ctx.canvas.width = src.width;
    ctx.canvas.height = src.height;
    ctx.drawImage(src, 0, 0);

    const data = ctx.getImageData(0, 0, bm.width, bm.height).data;
    for (let i = 0, j = 0, l = data.length; i < l; i += 4, ++j) {
      bm.data[j] = data[i + 3] >= 128 ? 1 : 0;
    }

    return bm;
  }

  static createFromFunction(f, width, height) {
    const bm = new Bitmap(width, height);
    for (let i = 0, y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++i, ++x) {
        bm.data[i] = f(x, y) ? 1 : 0;
      }
    }
    return bm;
  }

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = new Int8Array(width * height);
  }

  at(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height && this.data[this.width * y + x] === 1;
  }

  flip(x, y) {
    const i = this.width * y + x;
    this.data[i] = this.data[i] ? 0 : 1;
  }

  copy() {
    const bm = new Bitmap(this.width, this.height);
    for (let i = 0, len = this.data.length; i < len; ++i) {
      bm.data[i] = this.data[i];
    }
    return bm;
  }
}

class Path {
  constructor() {
    this.area = 0;
    this.len = 0;
    this.pt = [];
    this.minX = 100000;
    this.minY = 100000;
    this.maxX = -1;
    this.maxY = -1;
    this.signIsPlus = true;
    this.curve;
  }

  makeCurve() {
    this.curve = Curve.createFromPath(this);
  }

  optimize(alphaMax, optCurve, optTolerance) {
    this.curve = this.curve.optimize(alphaMax, optCurve, optTolerance);
  }
}

// class PathList {
//   static fromFunction(f, width, height, policy, turdSize, alphaMax, optCurve, optTolerance) {
//     const bm = Bitmap.createFromFunction(f, width, height);
//     const pl = new PathList();  // Utilise le constructeur directement
//     const paths = new PathListBuilder(bm, policy).trace(f, turdSize);
//     paths.forEach(p => pl.push(p));
//     PathList.optimize(pl, alphaMax, optCurve, optTolerance);
//     return pl;
//   }

//   static fromBitmap(src, policy, turdSize, alphaMax, optCurve, optTolerance) {
//     const pl = new PathList();
//     const builder = new PathListBuilder(src.copy(), policy);
//     const tracedPaths = builder.trace((x, y) => src.at(x, y), turdSize);
    
//     // Copie les propriétés et chemins
//     pl.width = tracedPaths.width;
//     pl.height = tracedPaths.height;
//     tracedPaths.paths.forEach(p => pl.push(p));

//     console.log(PathList, "azeazeazeaze")
    
//     // PathList.paths.forEach(p => p.optimize(pl, alphaMax, optCurve, optTolerance));
//     tracedPaths.paths.forEach(p => p.optimize(pl, alphaMax, optCurve, optTolerance));
//     return pl;
//   }

//   // Supprimez la méthode static create() inutile

//   constructor() {
//     this.paths = []; // Stocke les instances de Path
//     this.width = 0;
//     this.height = 0;
//   }

//   // Méthode pour compatibilité Array-like
//   push(path) {
//     this.paths.push(path);
//     return this.paths.length;
//   }

//   // Ajoutez length pour la compatibilité
//   get length() {
//     return this.paths.length;
//   }

//   toSVGpathString(scale){
//     const svg = []

//     for (let i = 0, len = this.paths.length; i < len; ++i) {
//       const curve = this.paths[i].curve
//       const c = curve.c
//       const n = curve.n * 3

//       svg.push("M" + (c[n - 1].x * scale).toFixed(3) + " " + (c[n - 1].y * scale).toFixed(3) + " ")
//       for (let i = 0, j = 0; j < n; ++i, j += 3) {
//         if (curve.tag[i] === CurveTag.Curve) {
//           svg.push("C " + (c[j + 0].x * scale).toFixed(3) + " " + (c[j + 0].y * scale).toFixed(3) + ",")
//           svg.push((c[j + 1].x * scale).toFixed(3) + " " + (c[j + 1].y * scale).toFixed(3) + ",")
//           svg.push((c[j + 2].x * scale).toFixed(3) + " " + (c[j + 2].y * scale).toFixed(3) + " ")
//         } else if (curve.tag[i] === CurveTag.Corner) {
//           svg.push("L " + (c[j + 1].x * scale).toFixed(3) + " " + (c[j + 1].y * scale).toFixed(3) + " ")
//           svg.push((c[j + 2].x * scale).toFixed(3) + " " + (c[j + 2].y * scale).toFixed(3) + " ")
//         }
//       }
//     }

//     return svg.join("")
//   }

//   toSVG(scale, stroke){
//     const w = this.paths.width * scale
//     const h = this.paths.height * scale
//     const svg = [`<svg id="svg" version="1.1" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">`]

//     svg.push('<path d="')
//     svg.push(this.paths.toSVGpathString(scale))

//     if (stroke) {
//       svg.push('" stroke="black" fill="none"/>')
//     } else {
//       svg.push('" stroke="none" fill="black" fill-rule="evenodd"/>')
//     }

//     svg.push("</svg>")
//     return svg.join("")
//   }

//   simplify(){
//     const r = []

//     for (let i = 0, len = this.paths.length; i < len; ++i) {
//       const curve = this.paths[i].curve
//       const c = curve.c
//       const n = curve.n * 3
//       r.push([c[n - 1].x, c[n - 1].y])
//       for (let i = 0, j = 0; j < n; ++i, j += 3) {
//         if (curve.tag[i] === CurveTag.Curve) {
//           r.push([c[j + 0].x, c[j + 0].y, c[j + 1].x, c[j + 1].y, c[j + 2].x, c[j + 2].y])
//         } else if (curve.tag[i] === CurveTag.Corner) {
//           r.push([c[j + 1].x, c[j + 1].y, c[j + 2].x, c[j + 2].y])
//         }
//       }
//     }

//     return {
//       paths: r,
//       width: this.paths.width,
//       height: this.paths.height,
//     }
//   }

//   strokePath(ctx){
//     for (let i = 0, len = this.paths.length; i < len; ++i) {
//       const curve = this.paths[i].curve
//       const c = curve.c
//       const n = curve.n * 3

//       ctx.moveTo(c[n - 1].x, c[n - 1].y)
//       for (let i = 0, j = 0; j < n; ++i, j += 3) {
//         if (curve.tag[i] === CurveTag.Curve) {
//           ctx.bezierCurveTo(c[j + 0].x, c[j + 0].y, c[j + 1].x, c[j + 1].y, c[j + 2].x, c[j + 2].y)
//         } else if (curve.tag[i] === CurveTag.Corner) {
//           ctx.lineTo(c[j + 1].x, c[j + 1].y)
//           ctx.lineTo(c[j + 2].x, c[j + 2].y)
//         }
//       }
//     }
//   }
// }
// class PathListBuilder {
//   constructor(bm, policy) {
//     this.bm = bm;
//     this.policy = policy;
//   }

//   trace(f, turdSize) {
//     const result = new PathList();
//     result.width = this.bm.width;
//     result.height = this.bm.height;
  
//     let cur = new Point(0, 0);
//     while ((cur = this.findNext(cur))) {
//       const path = this.findPath(cur, f(cur.x, cur.y));
//       this.xorPath(path);
//       if (path.area > turdSize) {
//         result.push(path);
//       }
//     }
//     return result;
//   }

//   findNext(prev) {
//     const bm = this.bm
//     const width = bm.width
//     const height = bm.height

//     for (let x = prev.x; x < width; ++x) {
//       if (bm.at(x, prev.y)) {
//         return new Point(x, prev.y)
//       }
//     }

//     for (let y = prev.y + 1; y < height; ++y) {
//       for (let x = 0; x < width; ++x) {
//         if (bm.at(x, y)) {
//           return new Point(x, y)
//         }
//       }
//     }

//     return null
//   }

//   majority(x, y) {
//     const bm = this.bm
//     for (let i = 2; i < 5; ++i) {
//       let ct = 0
//       for (let a = -i + 1; a <= i - 1; ++a) {
//         ct += bm.at(x + a, y + i - 1) ? 1 : -1
//         ct += bm.at(x + i - 1, y + a - 1) ? 1 : -1
//         ct += bm.at(x + a - 1, y - i) ? 1 : -1
//         ct += bm.at(x - i, y + a) ? 1 : -1
//       }
//       if (ct > 0) {
//         return 1
//       } else if (ct < 0) {
//         return 0
//       }
//     }
//     return 0
//   }

//   findPath(point, signIsPlus){
//     const bm = this.bm
//     const turnPolicy = this.policy
//     const path = new Path()
//     let x = point.x
//     let y = point.y
//     let dirx = 0
//     let diry = 1
//     let tmp

//     path.signIsPlus = signIsPlus
//     while (1) {
//       path.pt.push(new Point(x, y))
//       if (x > path.maxX) {
//         path.maxX = x
//       }
//       if (x < path.minX) {
//         path.minX = x
//       }
//       if (y > path.maxY) {
//         path.maxY = y
//       }
//       if (y < path.minY) {
//         path.minY = y
//       }
//       ++path.len

//       x += dirx
//       y += diry
//       path.area -= x * diry

//       if (x === point.x && y === point.y) {
//         break
//       }

//       const l = bm.at(x + (dirx + diry - 1) / 2, y + (diry - dirx - 1) / 2)
//       const r = bm.at(x + (dirx - diry - 1) / 2, y + (diry + dirx - 1) / 2)

//       if (r && !l) {
//         if (
//           turnPolicy === TurnPolicy.Right ||
//           (turnPolicy === TurnPolicy.Black && path.signIsPlus) ||
//           (turnPolicy === TurnPolicy.White && !path.signIsPlus) ||
//           (turnPolicy === TurnPolicy.Majority && this.majority(x, y)) ||
//           (turnPolicy === TurnPolicy.Minority && !this.majority(x, y))
//         ) {
//           tmp = dirx
//           dirx = -diry
//           diry = tmp
//         } else {
//           tmp = dirx
//           dirx = diry
//           diry = -tmp
//         }
//       } else if (r) {
//         tmp = dirx
//         dirx = -diry
//         diry = tmp
//       } else if (!l) {
//         tmp = dirx
//         dirx = diry
//         diry = -tmp
//       }
//     }
//     return path
//   }

//   xorPath(path){
//     const bm = this.bm
//     let y1 = path.pt[0].y
//     const len = path.len
//     for (let i = 1; i < len; ++i) {
//       const x = path.pt[i].x
//       const y = path.pt[i].y

//       if (y !== y1) {
//         const minY = y1 < y ? y1 : y
//         const maxX = path.maxX
//         for (let j = x; j < maxX; ++j) {
//           bm.flip(j, minY)
//         }
//         y1 = y
//       }
//     }
//   }
// }

class PathList extends Path {
  static fromFunction(f, width, height, policy, turdSize, alphaMax, optCurve, optTolerance) {
    const bm = Bitmap.createFromFunction(f, width, height);
    const pl = new PathList();  // Utilise le constructeur directement
    const paths = new PathListBuilder(bm, policy).trace(f, turdSize);
    paths.forEach(p => pl.push(p));
    PathList.optimize(pl, alphaMax, optCurve, optTolerance);
    return pl;
  }

  static fromBitmap(src, policy, turdSize, alphaMax, optCurve, optTolerance) {
    const pl = new PathList();
    const builder = new PathListBuilder(src.copy(), policy);
    const traced = builder.trace((x, y) => src.at(x, y), turdSize);
    
    // Copie des propriétés
    pl.width = traced.width;
    pl.height = traced.height;
    
    // Copie des chemins
    traced.paths.forEach(p => pl.push(p));
    
    PathList.optimize(pl, alphaMax, optCurve, optTolerance);
    return pl;
  }

  // Supprimez la méthode static create() inutile

  constructor() {
    super();
    this._paths = []; // Stockage interne des chemins
    this.width = 0;
    this.height = 0;
  }

  // Implémentation des méthodes Array essentielles
  push(path) {
    this._paths.push(path);
    return this._paths.length;
  }

  get length() {
    return this._paths.length;
  }

  // Accès aux chemins par index
  [Symbol.iterator]() {
    return this._paths[Symbol.iterator]();
  }

  // Pour la compatibilité avec le code existant
  get paths() {
    return this._paths;
  }

  toSVGpathString(scale){
    const svg = []

    for (let i = 0, len = this._paths.length; i < len; ++i) {
      const curve = this._paths[i].curve
      if (!curve || !curve.c || !curve.tag) {
        console.error("Curve not properly initialized for path", i);
        continue;
      }
      const c = curve.c
      const n = curve.n * 3

      // console.log(c[n - 1], "svg loading", this)

      svg.push("M" + (c[n - 1].x * scale).toFixed(3) + " " + (c[n - 1].y * scale).toFixed(3) + " ")
      for (let i = 0, j = 0; j < n; ++i, j += 3) {
        if (curve.tag[i] === CurveTag.Curve) {
          svg.push("C " + (c[j + 0].x * scale).toFixed(3) + " " + (c[j + 0].y * scale).toFixed(3) + ",")
          svg.push((c[j + 1].x * scale).toFixed(3) + " " + (c[j + 1].y * scale).toFixed(3) + ",")
          svg.push((c[j + 2].x * scale).toFixed(3) + " " + (c[j + 2].y * scale).toFixed(3) + " ")
        } else if (curve.tag[i] === CurveTag.Corner) {
          svg.push("L " + (c[j + 1].x * scale).toFixed(3) + " " + (c[j + 1].y * scale).toFixed(3) + " ")
          svg.push((c[j + 2].x * scale).toFixed(3) + " " + (c[j + 2].y * scale).toFixed(3) + " ")
        }
      }
    }

    return svg.join("")
  }

  toSVG(scale, stroke){
    const w = this._paths.width * scale
    const h = this._paths.height * scale
    const svg = [`<svg id="svg" version="1.1" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">`]

    svg.push('<path d="')
    svg.push(this._paths.toSVGpathString(scale))

    if (stroke) {
      svg.push('" stroke="black" fill="none"/>')
    } else {
      svg.push('" stroke="none" fill="black" fill-rule="evenodd"/>')
    }

    svg.push("</svg>")
    return svg.join("")
  }

  simplify(){
    const r = []

    for (let i = 0, len = this._paths.length; i < len; ++i) {
      const curve = this._paths[i].curve
      const c = curve.c
      const n = curve.n * 3
      r.push([c[n - 1].x, c[n - 1].y])
      for (let i = 0, j = 0; j < n; ++i, j += 3) {
        if (curve.tag[i] === CurveTag.Curve) {
          r.push([c[j + 0].x, c[j + 0].y, c[j + 1].x, c[j + 1].y, c[j + 2].x, c[j + 2].y])
        } else if (curve.tag[i] === CurveTag.Corner) {
          r.push([c[j + 1].x, c[j + 1].y, c[j + 2].x, c[j + 2].y])
        }
      }
    }

    return {
      paths: r,
      width: this._paths.width,
      height: this._paths.height,
    }
  }

  strokePath(ctx){
    for (let i = 0, len = this._paths.length; i < len; ++i) {
      const curve = this._paths[i].curve
      const c = curve.c
      const n = curve.n * 3

      ctx.moveTo(c[n - 1].x, c[n - 1].y)
      for (let i = 0, j = 0; j < n; ++i, j += 3) {
        if (curve.tag[i] === CurveTag.Curve) {
          ctx.bezierCurveTo(c[j + 0].x, c[j + 0].y, c[j + 1].x, c[j + 1].y, c[j + 2].x, c[j + 2].y)
        } else if (curve.tag[i] === CurveTag.Corner) {
          ctx.lineTo(c[j + 1].x, c[j + 1].y)
          ctx.lineTo(c[j + 2].x, c[j + 2].y)
        }
      }
    }
  }

  static optimize(pl, alphaMax, optCurve, optTolerance) {
    for (let i = 0; i < pl._paths.length; i++) {
      const path = pl._paths[i]; // Accès via .paths
      console.log(path, "optimize path")
      if (!path.curve) {
        path.makeCurve(); // Crée la courbe si elle n'existe pas
      }
      path.optimize(alphaMax, optCurve, optTolerance);
    }
  }
}
class PathListBuilder {
  constructor(bm, policy) {
    this.bm = bm;
    this.policy = policy;
  }

  trace(f, turdSize) {
    const pathList = new PathList();
    pathList.width = this.bm.width;
    pathList.height = this.bm.height;
  
    let cur = new Point(0, 0);
    while ((cur = this.findNext(cur))) {
      const path = this.findPath(cur, f(cur.x, cur.y));
      this.xorPath(path);
      if (path.area > turdSize) {
        pathList.push(path);
      }
    }
    return pathList;
  }

  findNext(prev) {
    const bm = this.bm
    const width = bm.width
    const height = bm.height

    for (let x = prev.x; x < width; ++x) {
      if (bm.at(x, prev.y)) {
        return new Point(x, prev.y)
      }
    }

    for (let y = prev.y + 1; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        if (bm.at(x, y)) {
          return new Point(x, y)
        }
      }
    }

    return null
  }

  majority(x, y) {
    const bm = this.bm
    for (let i = 2; i < 5; ++i) {
      let ct = 0
      for (let a = -i + 1; a <= i - 1; ++a) {
        ct += bm.at(x + a, y + i - 1) ? 1 : -1
        ct += bm.at(x + i - 1, y + a - 1) ? 1 : -1
        ct += bm.at(x + a - 1, y - i) ? 1 : -1
        ct += bm.at(x - i, y + a) ? 1 : -1
      }
      if (ct > 0) {
        return 1
      } else if (ct < 0) {
        return 0
      }
    }
    return 0
  }

  findPath(point, signIsPlus){
    const bm = this.bm
    const turnPolicy = this.policy
    const path = new Path()
    let x = point.x
    let y = point.y
    let dirx = 0
    let diry = 1
    let tmp

    path.signIsPlus = signIsPlus
    while (1) {
      path.pt.push(new Point(x, y))
      if (x > path.maxX) {
        path.maxX = x
      }
      if (x < path.minX) {
        path.minX = x
      }
      if (y > path.maxY) {
        path.maxY = y
      }
      if (y < path.minY) {
        path.minY = y
      }
      ++path.len

      x += dirx
      y += diry
      path.area -= x * diry

      if (x === point.x && y === point.y) {
        break
      }

      const l = bm.at(x + (dirx + diry - 1) / 2, y + (diry - dirx - 1) / 2)
      const r = bm.at(x + (dirx - diry - 1) / 2, y + (diry + dirx - 1) / 2)

      if (r && !l) {
        if (
          turnPolicy === TurnPolicy.Right ||
          (turnPolicy === TurnPolicy.Black && path.signIsPlus) ||
          (turnPolicy === TurnPolicy.White && !path.signIsPlus) ||
          (turnPolicy === TurnPolicy.Majority && this.majority(x, y)) ||
          (turnPolicy === TurnPolicy.Minority && !this.majority(x, y))
        ) {
          tmp = dirx
          dirx = -diry
          diry = tmp
        } else {
          tmp = dirx
          dirx = diry
          diry = -tmp
        }
      } else if (r) {
        tmp = dirx
        dirx = -diry
        diry = tmp
      } else if (!l) {
        tmp = dirx
        dirx = diry
        diry = -tmp
      }
    }
    return path
  }

  xorPath(path){
    const bm = this.bm
    let y1 = path.pt[0].y
    const len = path.len
    for (let i = 1; i < len; ++i) {
      const x = path.pt[i].x
      const y = path.pt[i].y

      if (y !== y1) {
        const minY = y1 < y ? y1 : y
        const maxX = path.maxX
        for (let j = x; j < maxX; ++j) {
          bm.flip(j, minY)
        }
        y1 = y
      }
    }
  }
  // xorPath(path) {
  //   const bm = this.bm;
  //   const len = path.len;
  //   for (let i = 0; i < len; i++) {
  //       const x = path.pt[i].x;
  //       const y = path.pt[i].y;
  //       if (x >= 0 && x < bm.width && y >= 0 && y < bm.height) {
  //           bm.flip(x, y);
  //       }
  //   }
  // }
}

// class Curve {
//   static createFromPath(path) {
//     return CurveBuilder.build(path);
//   }

//   constructor(n) {
//     this.n = n;
//     this.tag = new Array(n);
//     this.c = new Array(n * 3);
//     this.vertex = new Array(n);
//   }

//   reverse() {
//     const m = this.n;
//     const v = this.vertex;

//     for (let i = 0, j = m - 1; i < j; ++i, --j) {
//       const tmp = v[i];
//       v[i] = v[j];
//       v[j] = tmp;
//     }
//   }

//   optimize(alphaMax, optCurve, optTolerance) {
//     return CurveOptimizer.optimize(this, alphaMax, optCurve, optTolerance);
//   }
// }
class Curve {
  static createFromPath(path){
    return CurveBuilder.build(path)
  }

  constructor(n) {
    // this.tag
    // this.c
    // this.vertex
    this.n = n; // Ajoutez cette ligne
    this.tag = new Array(n);
    this.c = new Array(n * 3);
    this.vertex = new Array(n);
    // this.tag = new Array(n)
    // this.c = new Array(n * 3)
    // this.vertex = new Array(n)
  }

  reverse(){
    const m = this.n
    const v = this.vertex

    for (let i = 0, j = m - 1; i < j; ++i, --j) {
      const tmp = v[i]
      v[i] = v[j]
      v[j] = tmp
    }
  }

  optimize(alphaMax, optCurve, optTolerance){
    return CurveOptimizer.optimize(this, alphaMax, optCurve, optTolerance)
  }
}
class CurveBuilder {
  static build(path){
    const cb = new CurveBuilder(path)
    cb.calcSums()
    cb.calcLon()
    cb.bestPolygon()
    return cb.adjustVertices()
  }

  constructor(path) {
    this.path = path
    this.x0
    this.y0
    this.sums
    this.lon
    this.m
    this.po
  }

  calcSums(){
    const path = this.path
    this.x0 = path.pt[0].x
    this.y0 = path.pt[0].y
    this.sums = []
    const s = this.sums
    s.push(new Sum(0, 0, 0, 0, 0))
    for (let i = 0; i < path.len; ++i) {
      const x = path.pt[i].x - this.x0
      const y = path.pt[i].y - this.y0
      s.push(new Sum(s[i].x + x, s[i].y + y, s[i].xy + x * y, s[i].x2 + x * x, s[i].y2 + y * y))
    }
  }

  calcLon(){
    const path = this.path
    const n = path.len
    const pt = path.pt
    let dir
    const pivk = new Array(n)
    const nc = new Array(n)
    const ct = new Array(4)
    this.lon = new Array(n)

    const constraint = [new Point(0, 0), new Point(0, 0)]
    const cur = new Point(0, 0)
    const off = new Point(0, 0)
    const dk = new Point(0, 0)

    for (let i = n - 1, k = 0; i >= 0; --i) {
      if (pt[i].x !== pt[k].x && pt[i].y !== pt[k].y) {
        k = i + 1
      }
      nc[i] = k
    }

    for (let i = n - 1; i >= 0; --i) {
      ct[0] = ct[1] = ct[2] = ct[3] = 0
      dir = (3 + 3 * (pt[mod(i + 1, n)].x - pt[i].x) + (pt[mod(i + 1, n)].y - pt[i].y)) / 2
      ++ct[dir]

      constraint[0].x = 0
      constraint[0].y = 0
      constraint[1].x = 0
      constraint[1].y = 0

      let k = nc[i]
      let k1 = i
      let foundk = false

      while (1) {
        foundk = false
        dir = (3 + 3 * sign(pt[k].x - pt[k1].x) + sign(pt[k].y - pt[k1].y)) / 2
        ++ct[dir]

        if (ct[0] && ct[1] && ct[2] && ct[3]) {
          pivk[i] = k1
          foundk = true
          break
        }

        cur.x = pt[k].x - pt[i].x
        cur.y = pt[k].y - pt[i].y

        if (xprod(constraint[0], cur) < 0 || xprod(constraint[1], cur) > 0) {
          break
        }

        if (Math.abs(cur.x) > 1 || Math.abs(cur.y) > 1) {
          off.x = cur.x + (cur.y >= 0 && (cur.y > 0 || cur.x < 0) ? 1 : -1)
          off.y = cur.y + (cur.x <= 0 && (cur.x < 0 || cur.y < 0) ? 1 : -1)
          if (xprod(constraint[0], off) >= 0) {
            constraint[0].x = off.x
            constraint[0].y = off.y
          }
          off.x = cur.x + (cur.y <= 0 && (cur.y < 0 || cur.x < 0) ? 1 : -1)
          off.y = cur.y + (cur.x >= 0 && (cur.x > 0 || cur.y < 0) ? 1 : -1)
          if (xprod(constraint[1], off) <= 0) {
            constraint[1].x = off.x
            constraint[1].y = off.y
          }
        }
        k1 = k
        k = nc[k1]
        if (!cyclic(k, i, k1)) {
          break
        }
      }

      if (!foundk) {
        dk.x = sign(pt[k].x - pt[k1].x)
        dk.y = sign(pt[k].y - pt[k1].y)
        cur.x = pt[k1].x - pt[i].x
        cur.y = pt[k1].y - pt[i].y

        const a = xprod(constraint[0], cur)
        const b = xprod(constraint[0], dk)
        const c = xprod(constraint[1], cur)
        const d = xprod(constraint[1], dk)

        let j = 10000000
        if (b < 0) {
          j = Math.floor(a / -b)
        }
        if (d > 0) {
          j = Math.min(j, Math.floor(-c / d))
        }
        pivk[i] = mod(k1 + j, n)
      }
    }

    let j = pivk[n - 1]
    this.lon[n - 1] = j
    for (let i = n - 2; i >= 0; --i) {
      if (cyclic(i + 1, pivk[i], j)) {
        j = pivk[i]
      }
      this.lon[i] = j
    }

    for (let i = n - 1; cyclic(mod(i + 1, n), j, this.lon[i]); --i) {
      this.lon[i] = j
    }
  }

  bestPolygon(){
    const n = this.path.len
    const pen = new Array(n + 1)
    const prev = new Array(n + 1)
    const clip0 = new Array(n)
    const clip1 = new Array(n + 1)
    const seg0 = new Array(n + 1)
    const seg1 = new Array(n + 1)

    for (let i = 0; i < n; ++i) {
      let c = mod(this.lon[mod(i - 1, n)] - 1, n)
      if (c === i) {
        c = mod(i + 1, n)
      }

      clip0[i] = c < i ? n : c
    }

    for (let i = 0, j = 1; i < n; ++i) {
      while (j <= clip0[i]) {
        clip1[j] = i
        ++j
      }
    }

    let j = 0
    for (let i = 0; i < n; ++j) {
      seg0[j] = i
      i = clip0[i]
    }
    seg0[j] = n
    const m = j

    let i = n
    for (let j = m; j > 0; --j) {
      seg1[j] = i
      i = clip1[i]
    }
    seg1[0] = 0

    pen[0] = 0
    for (let j = 1; j <= m; ++j) {
      for (let i = seg1[j]; i <= seg0[j]; ++i) {
        let best = -1
        for (let k = seg0[j - 1]; k >= clip1[i]; --k) {
          const thispen = this.penalty3(k, i) + pen[k]
          if (best < 0 || thispen < best) {
            prev[i] = k
            best = thispen
          }
        }
        pen[i] = best
      }
    }
    this.m = m
    this.po = new Array(m)

    for (let i = n, j = m - 1; i > 0; --j) {
      i = prev[i]
      this.po[j] = i
    }
  }

  penalty3(i, j) {
    const n = this.path.len
    const pt = this.path.pt
    const sums = this.sums
    let r = 0
    if (j >= n) {
      j -= n
      r = 1
    }

    let x
    let y
    let x2
    let xy
    let y2
    let k

    if (r === 0) {
      x = sums[j + 1].x - sums[i].x
      y = sums[j + 1].y - sums[i].y
      x2 = sums[j + 1].x2 - sums[i].x2
      xy = sums[j + 1].xy - sums[i].xy
      y2 = sums[j + 1].y2 - sums[i].y2
      k = j + 1 - i
    } else {
      x = sums[j + 1].x - sums[i].x + sums[n].x
      y = sums[j + 1].y - sums[i].y + sums[n].y
      x2 = sums[j + 1].x2 - sums[i].x2 + sums[n].x2
      xy = sums[j + 1].xy - sums[i].xy + sums[n].xy
      y2 = sums[j + 1].y2 - sums[i].y2 + sums[n].y2
      k = j + 1 - i + n
    }

    const px = (pt[i].x + pt[j].x) / 2.0 - pt[0].x
    const py = (pt[i].y + pt[j].y) / 2.0 - pt[0].y
    const ey = pt[j].x - pt[i].x
    const ex = -(pt[j].y - pt[i].y)

    const a = (x2 - 2 * x * px) / k + px * px
    const b = (xy - x * py - y * px) / k + px * py
    const c = (y2 - 2 * y * py) / k + py * py

    const s = ex * ex * a + 2 * ex * ey * b + ey * ey * c
    return Math.sqrt(s)
  }

  adjustVertices(){
    const path = this.path
    const m = this.m
    const po = this.po
    const n = path.len
    const pt = path.pt
    const x0 = this.x0
    const y0 = this.y0
    const ctr = new Array(m)
    const dir = new Array(m)
    const q = new Array(m)
    const v = new Array(3)
    const s = new Point(0, 0)
    const curve = new Curve(m)

    for (let i = 0; i < m; ++i) {
      let j = po[mod(i + 1, m)]
      j = mod(j - po[i], n) + po[i]
      ctr[i] = new Point(0, 0)
      dir[i] = new Point(0, 0)
      this.pointslope(po[i], j, ctr[i], dir[i])
    }

    for (let i = 0; i < m; ++i) {
      q[i] = new Quad()
      const d = dir[i].x * dir[i].x + dir[i].y * dir[i].y
      if (d === 0.0) {
        for (let j = 0; j < 3; ++j) {
          for (let k = 0; k < 3; ++k) {
            q[i].data[j * 3 + k] = 0
          }
        }
      } else {
        v[0] = dir[i].y
        v[1] = -dir[i].x
        v[2] = -v[1] * ctr[i].y - v[0] * ctr[i].x
        for (let l = 0; l < 3; ++l) {
          for (let k = 0; k < 3; ++k) {
            q[i].data[l * 3 + k] = (v[l] * v[k]) / d
          }
        }
      }
    }

    for (let i = 0; i < m; ++i) {
      const Q = new Quad()
      const w = new Point(0, 0)

      s.x = pt[po[i]].x - x0
      s.y = pt[po[i]].y - y0

      const j = mod(i - 1, m)

      for (let l = 0; l < 3; ++l) {
        for (let k = 0; k < 3; ++k) {
          Q.data[l * 3 + k] = q[j].at(l, k) + q[i].at(l, k)
        }
      }

      while (true) {
        const det = Q.at(0, 0) * Q.at(1, 1) - Q.at(0, 1) * Q.at(1, 0)
        if (det !== 0.0) {
          w.x = (-Q.at(0, 2) * Q.at(1, 1) + Q.at(1, 2) * Q.at(0, 1)) / det
          w.y = (Q.at(0, 2) * Q.at(1, 0) - Q.at(1, 2) * Q.at(0, 0)) / det
          break
        }

        if (Q.at(0, 0) > Q.at(1, 1)) {
          v[0] = -Q.at(0, 1)
          v[1] = Q.at(0, 0)
        } else if (Q.at(1, 1)) {
          v[0] = -Q.at(1, 1)
          v[1] = Q.at(1, 0)
        } else {
          v[0] = 1
          v[1] = 0
        }
        const d = v[0] * v[0] + v[1] * v[1]
        v[2] = -v[1] * s.y - v[0] * s.x
        for (let l = 0; l < 3; ++l) {
          for (let k = 0; k < 3; ++k) {
            Q.data[l * 3 + k] += (v[l] * v[k]) / d
          }
        }
      }
      let dx = Math.abs(w.x - s.x)
      let dy = Math.abs(w.y - s.y)
      if (dx <= 0.5 && dy <= 0.5) {
        curve.vertex[i] = new Point(w.x + x0, w.y + y0)
        continue
      }

      let min = Q.apply(s)
      let xmin = s.x
      let ymin = s.y

      if (Q.at(0, 0) !== 0.0) {
        for (let z = 0; z < 2; ++z) {
          w.y = s.y - 0.5 + z
          w.x = -(Q.at(0, 1) * w.y + Q.at(0, 2)) / Q.at(0, 0)
          dx = Math.abs(w.x - s.x)
          const cand = Q.apply(w)
          if (dx <= 0.5 && cand < min) {
            min = cand
            xmin = w.x
            ymin = w.y
          }
        }
      }

      if (Q.at(1, 1) !== 0.0) {
        for (let z = 0; z < 2; ++z) {
          w.x = s.x - 0.5 + z
          w.y = -(Q.at(1, 0) * w.x + Q.at(1, 2)) / Q.at(1, 1)
          dy = Math.abs(w.y - s.y)
          const cand = Q.apply(w)
          if (dy <= 0.5 && cand < min) {
            min = cand
            xmin = w.x
            ymin = w.y
          }
        }
      }

      for (let l = 0; l < 2; ++l) {
        for (let k = 0; k < 2; ++k) {
          w.x = s.x - 0.5 + l
          w.y = s.y - 0.5 + k
          const cand = Q.apply(w)
          if (cand < min) {
            min = cand
            xmin = w.x
            ymin = w.y
          }
        }
      }

      curve.vertex[i] = new Point(xmin + x0, ymin + y0)
    }

    if (!path.signIsPlus) {
      curve.reverse()
    }
    return curve
  }

  pointslope(i, j, ctr, dir){
    const n = this.path.len
    const sums = this.sums

    let r = 0
    while (j >= n) {
      j -= n
      r += 1
    }
    while (i >= n) {
      i -= n
      r -= 1
    }
    while (j < 0) {
      j += n
      r -= 1
    }
    while (i < 0) {
      i += n
      r += 1
    }

    const x = sums[j + 1].x - sums[i].x + r * sums[n].x
    const y = sums[j + 1].y - sums[i].y + r * sums[n].y
    const x2 = sums[j + 1].x2 - sums[i].x2 + r * sums[n].x2
    const xy = sums[j + 1].xy - sums[i].xy + r * sums[n].xy
    const y2 = sums[j + 1].y2 - sums[i].y2 + r * sums[n].y2
    const k = j + 1 - i + r * n

    ctr.x = x / k
    ctr.y = y / k

    let a = (x2 - (x * x) / k) / k
    const b = (xy - (x * y) / k) / k
    let c = (y2 - (y * y) / k) / k

    const lambda2 = (a + c + Math.sqrt((a - c) * (a - c) + 4 * b * b)) / 2

    a -= lambda2
    c -= lambda2

    let l
    if (Math.abs(a) >= Math.abs(c)) {
      l = Math.sqrt(a * a + b * b)
      if (l !== 0) {
        dir.x = -b / l
        dir.y = a / l
      }
    } else {
      l = Math.sqrt(c * c + b * b)
      if (l !== 0) {
        dir.x = -c / l
        dir.y = b / l
      }
    }
    if (l === 0) {
      dir.x = dir.y = 0
    }
  }
}
class CurveOptimizer {
  static optimize(curve, alphaMax, optCurve, optTolerance){
    const opt = new CurveOptimizer(curve)
    opt.smooth(alphaMax)
    if (optCurve) {
      return opt.optiCurve(optTolerance)
    }
    return curve
  }

  constructor(curve) {
    this.curve = curve
    this.alpha
    this.alpha0
    this.beta
    const n = curve.n
    // this.alpha = [n]
    // this.alpha0 = [n]
    // this.beta = [n]
    this.alpha = new Array(n)
    this.alpha0 = new Array(n)
    this.beta = new Array(n)
  }

  smooth(alphaMax){
    const curve = this.curve
    console.log(curve, "curve")
    const vertex = curve.vertex
    const m = curve.n
    for (let i = 0; i < m; ++i) {
      const j = mod(i + 1, m)
      const k = mod(i + 2, m)
      const p4 = interval(1 / 2.0, vertex[k], vertex[j])

      const denom = ddenom(vertex[i], vertex[k])
      let alpha
      if (denom !== 0.0) {
        const dd = Math.abs(dpara(vertex[i], vertex[j], vertex[k]) / denom)
        alpha = (dd > 1 ? 1 - 1.0 / dd : 0) / 0.75
      } else {
        alpha = 4 / 3.0
      }
      this.alpha0[j] = alpha

      if (alpha >= alphaMax) {
        curve.tag[j] = CurveTag.Corner
        curve.c[3 * j + 1] = vertex[j]
        curve.c[3 * j + 2] = p4
      } else {
        if (alpha < 0.55) {
          alpha = 0.55
        } else if (alpha > 1) {
          alpha = 1
        }
        curve.tag[j] = CurveTag.Curve
        curve.c[3 * j + 0] = interval(0.5 + 0.5 * alpha, vertex[i], vertex[j])
        curve.c[3 * j + 1] = interval(0.5 + 0.5 * alpha, vertex[k], vertex[j])
        curve.c[3 * j + 2] = p4
      }
      this.alpha[j] = alpha
      this.beta[j] = 0.5
    }
  }

  optiCurve(optTolerance){
    const curve = this.curve
    const m = curve.n
    const vert = curve.vertex
    const pt = [m + 1]
    const pen = [m + 1]
    const len = [m + 1]
    const opt = [m + 1]

    const convc = [m]
    const areac = [m + 1]
    // const pt = new Array(m + 1)
    // const pen = new Array(m + 1)
    // const len = new Array(m + 1)
    // const opt = new Array(m + 1)

    // const convc = new Array(m)
    // const areac = new Array(m + 1)

    for (let i = 0; i < m; ++i) {
      convc[i] = curve.tag[i] === CurveTag.Curve ? sign(dpara(vert[mod(i - 1, m)], vert[i], vert[mod(i + 1, m)])) : 0
    }

    let area = 0.0
    areac[0] = 0.0
    const p0 = curve.vertex[0]

    for (let i = 0; i < m; ++i) {
      const i1 = mod(i + 1, m)
      if (curve.tag[i1] === CurveTag.Curve) {
        const alpha = this.alpha[i1]
        area += (0.3 * alpha * (4 - alpha) * dpara(curve.c[i * 3 + 2], vert[i1], curve.c[i1 * 3 + 2])) / 2
        area += dpara(p0, curve.c[i * 3 + 2], curve.c[i1 * 3 + 2]) / 2
      }
      areac[i + 1] = area
    }

    pt[0] = -1
    pen[0] = 0
    len[0] = 0

    let o = new Opti()
    for (let j = 1; j <= m; ++j) {
      pt[j] = j - 1
      pen[j] = pen[j - 1]
      len[j] = len[j - 1] + 1

      for (let i = j - 2; i >= 0; --i) {
        const r = this.optiPenalty(i, mod(j, m), o, optTolerance, convc, areac)
        if (r) {
          break
        }
        if (len[j] > len[i] + 1 || (len[j] === len[i] + 1 && pen[j] > pen[i] + o.pen)) {
          pt[j] = i
          pen[j] = pen[i] + o.pen
          len[j] = len[i] + 1
          opt[j] = o
          o = new Opti()
        }
      }
    }
    const om = len[m]
    const ocurve = new Curve(om)
    const s = new Array(om)
    const t = new Array(om)

    for (let i = om - 1, j = m; i >= 0; --i) {
      if (pt[j] === j - 1) {
        ocurve.tag[i] = curve.tag[mod(j, m)]
        ocurve.c[i * 3 + 0] = curve.c[mod(j, m) * 3 + 0]
        ocurve.c[i * 3 + 1] = curve.c[mod(j, m) * 3 + 1]
        ocurve.c[i * 3 + 2] = curve.c[mod(j, m) * 3 + 2]
        ocurve.vertex[i] = curve.vertex[mod(j, m)]
        s[i] = t[i] = 1.0
      } else {
        ocurve.tag[i] = CurveTag.Curve
        ocurve.c[i * 3 + 0] = opt[j].c[0]
        ocurve.c[i * 3 + 1] = opt[j].c[1]
        ocurve.c[i * 3 + 2] = curve.c[mod(j, m) * 3 + 2]
        ocurve.vertex[i] = interval(opt[j].s, curve.c[mod(j, m) * 3 + 2], vert[mod(j, m)])
        s[i] = opt[j].s
        t[i] = opt[j].t
      }
      j = pt[j]
    }

    return ocurve
  }

  optiPenalty(
    i,
    j,
    res,
    optTolerance,
    convc,
    areac
  ){
    const curve = this.curve
    const m = curve.n
    const vertex = curve.vertex

    if (i === j) {
      return true
    }

    const k = i
    const i1 = mod(i + 1, m)
    let k1 = mod(k + 1, m)
    const conv = convc[k1]
    if (conv === 0) {
      return true
    }
    const d = ddist(vertex[i], vertex[i1])
    for (let k = k1; k !== j; k = k1) {
      k1 = mod(k + 1, m)
      const k2 = mod(k + 2, m)
      if (convc[k1] !== conv) {
        return true
      }
      if (sign(cprod(vertex[i], vertex[i1], vertex[k1], vertex[k2])) !== conv) {
        return true
      }
      if (iprod1(vertex[i], vertex[i1], vertex[k1], vertex[k2]) < d * ddist(vertex[k1], vertex[k2]) * -0.999847695156) {
        return true
      }
    }

    const p0 = curve.c[mod(i, m) * 3 + 2].copy()
    let p1 = vertex[mod(i + 1, m)].copy()
    let p2 = vertex[mod(j, m)].copy()
    const p3 = curve.c[mod(j, m) * 3 + 2].copy()

    let area = areac[j] - areac[i]
    area -= dpara(vertex[0], curve.c[i * 3 + 2], curve.c[j * 3 + 2]) / 2
    if (i >= j) {
      area += areac[m]
    }

    const A1 = dpara(p0, p1, p2)
    const A2 = dpara(p0, p1, p3)
    const A3 = dpara(p0, p2, p3)
    if (A2 === A1) {
      return true
    }

    const A4 = A1 + A3 - A2
    const t = A3 / (A3 - A4)
    const s = A2 / (A2 - A1)
    const A = (A2 * t) / 2.0
    if (A === 0.0) {
      return true
    }

    const R = area / A
    const alpha = 2 - Math.sqrt(4 - R / 0.3)
    res.c[0] = interval(t * alpha, p0, p1)
    res.c[1] = interval(s * alpha, p3, p2)
    res.alpha = alpha
    res.t = t
    res.s = s

    p1 = res.c[0].copy()
    p2 = res.c[1].copy()

    res.pen = 0

    for (let k = mod(i + 1, m), k1; k !== j; k = k1) {
      k1 = mod(k + 1, m)
      const t = tangent(p0, p1, p2, p3, vertex[k], vertex[k1])
      if (t < -0.5) {
        return true
      }
      const pt = bezier(t, p0, p1, p2, p3)
      const d = ddist(vertex[k], vertex[k1])
      if (d === 0.0) {
        return true
      }
      const d1 = dpara(vertex[k], vertex[k1], pt) / d
      if (Math.abs(d1) > optTolerance) {
        return true
      }
      if (iprod(vertex[k], vertex[k1], pt) < 0 || iprod(vertex[k1], vertex[k], pt) < 0) {
        return true
      }
      res.pen += d1 * d1
    }

    for (let k = i, k1; k !== j; k = k1) {
      k1 = mod(k + 1, m)
      const t = tangent(p0, p1, p2, p3, curve.c[k * 3 + 2], curve.c[k1 * 3 + 2])
      if (t < -0.5) {
        return true
      }
      const pt = bezier(t, p0, p1, p2, p3)
      const d = ddist(curve.c[k * 3 + 2], curve.c[k1 * 3 + 2])
      if (d === 0.0) {
        return true
      }
      let d1 = dpara(curve.c[k * 3 + 2], curve.c[k1 * 3 + 2], pt) / d
      let d2 = dpara(curve.c[k * 3 + 2], curve.c[k1 * 3 + 2], vertex[k1]) / d
      d2 *= 0.75 * this.alpha[k1]
      if (d2 < 0) {
        d1 = -d1
        d2 = -d2
      }
      if (d1 < d2 - optTolerance) {
        return true
      }
      if (d1 < d2) {
        res.pen += (d1 - d2) * (d1 - d2)
      }
    }

    return false
  }
}

class Sum {
  constructor(x, y, xy, x2, y2) {
    this.x = x;
    this.y = y;
    this.xy = xy;
    this.x2 = x2;
    this.y2 = y2;
  }
}

class Quad {
  constructor() {
    this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  at(x, y) {
    return this.data[x * 3 + y];
  }

  apply(w) {
    const v = [w.x, w.y, 1];
    let sum = 0.0;
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        sum += v[i] * this.at(i, j) * v[j];
      }
    }
    return sum;
  }
}

class Opti {
  constructor() {
    this.pen = 0;
    this.c = [new Point(0, 0), new Point(0, 0)];
    this.t = 0;
    this.s = 0;
    this.alpha = 0;
  }
}

// Helper functions
function mod(a, n) {
  return a >= n ? a % n : a >= 0 ? a : n - 1 - ((-1 - a) % n);
}

function xprod(p1, p2) {
  return p1.x * p2.y - p1.y * p2.x;
}

function cyclic(a, b, c) {
  if (a <= c) {
    return a <= b && b < c;
  } else {
    return a <= b || b < c;
  }
}

function sign(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}

function interval(lambda, a, b) {
  return new Point(a.x + lambda * (b.x - a.x), a.y + lambda * (b.y - a.y));
}

function dorthInfty(p0, p2) {
  return new Point(-sign(p2.y - p0.y), sign(p2.x - p0.x));
}

function ddenom(p0, p2) {
  const r = dorthInfty(p0, p2);
  return r.y * (p2.x - p0.x) - r.x * (p2.y - p0.y);
}

function dpara(p0, p1, p2) {
  const x1 = p1.x - p0.x;
  const y1 = p1.y - p0.y;
  const x2 = p2.x - p0.x;
  const y2 = p2.y - p0.y;
  return x1 * y2 - x2 * y1;
}

function cprod(p0, p1, p2, p3) {
  const x1 = p1.x - p0.x;
  const y1 = p1.y - p0.y;
  const x2 = p3.x - p2.x;
  const y2 = p3.y - p2.y;
  return x1 * y2 - x2 * y1;
}

function iprod(p0, p1, p2) {
  const x1 = p1.x - p0.x;
  const y1 = p1.y - p0.y;
  const x2 = p2.x - p0.x;
  const y2 = p2.y - p0.y;
  return x1 * x2 + y1 * y2;
}

function iprod1(p0, p1, p2, p3) {
  const x1 = p1.x - p0.x;
  const y1 = p1.y - p0.y;
  const x2 = p3.x - p2.x;
  const y2 = p3.y - p2.y;
  return x1 * x2 + y1 * y2;
}

function ddist(p, q) {
  return Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
}

function bezier(t, p0, p1, p2, p3) {
  const s = 1 - t;
  const s2 = s * s;
  const t2 = t * t;
  const s3 = s2 * s;
  const t3 = t2 * t;
  const s2t3 = 3 * s2 * t;
  const t2s3 = 3 * t2 * s;
  return new Point(
    s3 * p0.x + s2t3 * p1.x + t2s3 * p2.x + t3 * p3.x,
    s3 * p0.y + s2t3 * p1.y + t2s3 * p2.y + t3 * p3.y
  );
}

function tangent(p0, p1, p2, p3, q0, q1) {
  const A = cprod(p0, p1, q0, q1);
  const B = cprod(p1, p2, q0, q1);
  const C = cprod(p2, p3, q0, q1);

  const a = A - 2 * B + C;
  const b = -2 * A + 2 * B;
  const c = A;
  const d = b * b - 4 * a * c;

  if (a === 0 || d < 0) {
    return -1.0;
  }

  const s = Math.sqrt(d);
  const r1 = (-b + s) / (2 * a);
  const r2 = (-b - s) / (2 * a);

  if (r1 >= 0 && r1 <= 1) {
    return r1;
  } else if (r2 >= 0 && r2 <= 1) {
    return r2;
  } else {
    return -1.0;
  }
}

// Export public API
export default {
  TurnPolicy,
  fromImage(src, opt = {}) {
    return PathList.fromBitmap(
      Bitmap.createFromImage(src),
      typeof opt.turnPolicy !== "undefined" ? opt.turnPolicy : TurnPolicy.Minority,
      typeof opt.turdSize !== "undefined" ? opt.turdSize : 2,
      typeof opt.alphaMax !== "undefined" ? opt.alphaMax : 1,
      typeof opt.optCurve !== "undefined" ? opt.optCurve : true,
      typeof opt.optTolerance !== "undefined" ? opt.optTolerance : 0.2
    );
  },
  fromFunction(f, width, height, opt = {}) {
    return PathList.fromFunction(
      f,
      width,
      height,
      typeof opt.turnPolicy !== "undefined" ? opt.turnPolicy : TurnPolicy.Minority,
      typeof opt.turdSize !== "undefined" ? opt.turdSize : 2,
      typeof opt.alphaMax !== "undefined" ? opt.alphaMax : 1,
      typeof opt.optCurve !== "undefined" ? opt.optCurve : true,
      typeof opt.optTolerance !== "undefined" ? opt.optTolerance : 0.2
    );
  }
};