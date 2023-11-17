import Image from "next/image"
import logod from "@/public/logos.png"
import { NAVSR } from "./navSR"
import { SEC } from "./search"
import { BTNN } from "./btn"
import { CNAV } from "./navx/cnav"

export default function Reg(){
    let ground_image = ['blue', 'pink', 'black', 'red', 'yellow', 'orange']
    return (
        <div className="main" style={{}}>
            <div className="apps" style={{}}>
                <div className="unav">
                    <div className="nav">
                        <Image src={logod} className="mlogo"/>
                        <NAVSR/>
                        <SEC></SEC>
                        <BTNN />
                    </div>
                    <div className="content">
                        <div className="c-n" style={{width:"100%"}}>
                            <CNAV />
                        </div>
                        <div className="c-layer">
                            <div className="c-display" style={{backgroundColor:"black"}}>
                                <div className="c-d-side">
                                    {/* sidebar0 */}
                                </div>
                                <div className="c-d-side-s">
                                    {
                                        ground_image.map((item, index)=>{
                                            return (
                                                <div className="c-d-s-img" key={index}>
                                                    <div className="textarea">

                                                    </div>
                                                    <div className="bottom-text">

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* sidebar1 */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}