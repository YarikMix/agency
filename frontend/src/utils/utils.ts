import moment from "moment";
import 'moment/locale/ru'

export const formatPrice = (value:any) => {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export const formatDate = (value:string) => {
    return moment(value).locale("ru").format("D MMMM HH:mm")
}

export const downloadFile = (path:string, filename:string) => {
    const anchor = document.createElement('a');
    anchor.href = "http://localhost:3000" + path;
    anchor.target = '_blank';
    anchor.download = filename;
    anchor.click()
}