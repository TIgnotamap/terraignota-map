export default function ImageContainer({ images }) {
  return (
    <>
      {images.map((image) => (
        <img src={image.url} key={image._key} className="w-1/3" />
      ))}
    </>
  );
}
