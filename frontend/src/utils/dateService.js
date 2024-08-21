export const getformattedhours = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export const formatDate = (date) => {
    const newDate = new Date(date);
    // const istDate = new Date(newDate.getTime() + 5.5 * 60 * 60 * 1000);

    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();
    const hour = newDate.getHours().toString().padStart(2, "0");
    const minute = newDate.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hour}:${minute}`;
  };