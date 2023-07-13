export const showDate=(date)=> {
  let time = new Date(new Date(date).getTime()).toLocaleTimeString();
  let day = new Date(date).toLocaleDateString('en-US', { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' });
  return time + "," + " " + day;
}