import { Metadata } from "next"
import MeetingPage from "./MeetingPage";


interface Pageprops{
    params: {id: string }
}

export function generateMetaData({params:{id}}:Pageprops): Metadata{
        return {
            title:`Meeting ${id}`
        }
}

// export default function page({params:{id}}:Pageprops){
//   return <MeetingPage id={id} />;  
// }
export default function Page({ params: { id } }: Pageprops) {
    return <MeetingPage id={id} />;
}
