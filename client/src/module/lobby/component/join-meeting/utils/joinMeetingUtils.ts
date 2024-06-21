export const joinMeetingUtils = () => {
  const handlemeetingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRoom: string = e.target.value;
    const formattedRoom: string = newRoom.replace(/\D/g, "");
    const newFormattedRoom: string = formattedRoom
      .replace(/(\d{3})/g, "$1-")
      .replace(/-$/, "");
    return newFormattedRoom;
  };

  const validatemeetingId = (inputRoom: string) => {
    const isValid: boolean = inputRoom.length === 11 ? true : false;
    return isValid;
  };

  return { handlemeetingIdChange, validatemeetingId };
};
