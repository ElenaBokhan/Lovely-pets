declare module '*.css' {
    interface IClassName {
        [className: string]: string;
    }
    const classNames: IClassName;
    export default classNames;
}
declare module '*.module.css';
declare module '*.svg';
