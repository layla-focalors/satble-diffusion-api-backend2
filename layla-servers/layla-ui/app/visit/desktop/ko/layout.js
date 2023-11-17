import Image from "next/image"
import logod from "@/public/logos.png"
import { NAVSR } from "./navSR"
import { SEC } from "./search"
import { BTNN } from "./btn"
import { CNAV } from "./navx/cnav"
import { children } from './page'

export default function Reg({children}){
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
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Reg }