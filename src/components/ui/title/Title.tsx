import { titleFont } from "@/config/fonts";


interface Props{
  title: string;
  subTitle?:string;
  className?:string; 
}

export const Title = ({title,className,subTitle}: Props) => {
  return (
    <div>
      <h1 className={`${titleFont.className} text-2xl font-bold mt-8 mb-6 capitalize`}>{title}</h1>

      {
        subTitle && <div>
          {subTitle}
        </div>
      }
    </div>
  )
}
