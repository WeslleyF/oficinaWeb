import { format } from "date-fns";

export const dateUtil = {
    getNow: () => new Date(),

    formatDateTime: (date?: Date | null) => {
      if(!date) return "";
      return format(new Date(date), "yyyy/MM/dd HH:mm:ss");
    } 

}