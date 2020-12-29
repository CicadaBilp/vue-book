//
export function realPx(px){
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}



export function px2rem(px){
  const $r = 375 / 10
  return px / $r
}