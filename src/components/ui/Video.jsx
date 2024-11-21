export default function Video({ video }) {
  return <video src={video.url || video.fileUrl} controls></video>;
}
