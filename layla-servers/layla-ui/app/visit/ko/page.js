import Image from "next/image"
import logod from "@/public/logos.png"
import { NAVSR } from "./navSR"
import { SEC } from "./search"

export default function Reg(){
    return (
        <div className="main">
            <div className="apps">
                <div className="nav">
                    <Image src={logod} className="mlogo"/>
                    <NAVSR/>
                    <SEC></SEC>
                </div>
            </div>
        </div>
    )
}