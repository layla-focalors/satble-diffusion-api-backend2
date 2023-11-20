import Image from "next/image"
import logod from "@/public/logos.png"
import { NAVSR } from "./navSR"
import { SEC } from "./search"
import { BTNN } from "./btn"
import { CNAV } from "./navx/cnav"
import { XLS } from './session/8xloader'
import { BDG } from "./session/bigwindow"

export default function Reg(){
    let ground_image = ['blue', 'pink', 'black', 'red', 'yellow', 'orange']
    let keyiq = "인기 소설"
    let pages = ['추천 신화 웹소설', '은월 장편소설']
    // total 11
    let page_content = ['지금 플레이 중', '추천 로맨스', '추천 드라마', '웹툰 Top 100', '웹소설 Top 100', '이벤트 세션']
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
                                                    <div>
                                                        <div className="bottom-text" style={{color:"white", textAlign:"center"}}>
                                                            어떻게 하면?
                                                        </div>
                                                        <div style={{textAlign:"center", color:"white"}}>12</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* sidebar1 */}
                                </div>
                                <XLS key="h" core={keyiq}></XLS>
                                <BDG page={pages[0]}></BDG>
                                <div style={{width:"100%", height:"100px"}}></div>
                                <BDG page={pages[1]}></BDG>
                                {
                                    page_content.map((item, index)=>{
                                        return (
                                            <>
                                                <div style={{width:"100%", height:"100px"}}></div>
                                                <BDG page={page_content[index]}></BDG>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}