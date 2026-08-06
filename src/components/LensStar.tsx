/* The product's star glyph, exported from Figma (node 630:259). Its fill is
   a white → #581C87 gradient baked into the SVG, so it reads on dark surfaces such as
   the Ask Lens button and the Lens canvas. Used wherever the portal UI shows the star
   so every instance is the same artwork rather than an icon-font approximation. */
export default function LensStar({ size = 14 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/lens/star.svg"
      alt=""
      aria-hidden
      className="block max-w-none shrink-0"
      style={{ width: size, height: size }}
    />
  );
}
