function simplifyNumber(e){var r=e+"";return e>1e3&&999999>e?r=Math.round(e/1e3)+"K":e>1e6&&999999999>e?r=Math.round(e/1e6)+"M":e>1e9&&(r=Math.round(e/1e9)+"Bil"),r}function lerp(e,r,n){return e+n*(r-e)}