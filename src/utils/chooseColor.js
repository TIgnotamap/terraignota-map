export default function chooseColor(projectTitle) {
  switch (projectTitle) {
    case "Rocks":
      return "#6DED4A";
    case "Perspectives":
      return "#8e8ee2";
    case "Oscillators ":
      return "#d7192c";
    default:
      return "#ff0";
  }
}
