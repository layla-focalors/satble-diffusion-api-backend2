import { FaBoltLightning } from "react-icons/fa6";
import Link from "next/link";

export default function CNAV(){
    let stage = ['실시간 랭킹', '오늘신작', '이벤트', '자유', '완결추천', '한국인기', '해외인기']
    let stage_ccl = ['ranking', 'today', 'event', 'free', 'recom', 'korea', 'global']
    return (
        <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"left", marginLeft:"5px"}}>
            <Link href={'/visit/desktop/ko'}>
                <div className="border-0 mx-0 rounded-3xl" style={{width:"100px", height:"35px", backgroundColor:"black", color:"white", display:"flex", justifyContent:"center", alignItems:"center", fontSize:"10pt", fontFamily:"laylaSquare"}}>
                    <FaBoltLightning style={{color:"yellow"}}/>
                    <div style={{marginLeft:"4px"}}>지금핫한</div>
                </div>
            </Link>
            {
                stage.map((e, i) => {
                    if(e.length == 3){
                        return (
                            <Link href={'/visit/desktop/ko/pages/' + stage_ccl[i]}>
                                <div key={e}>
                                    <div key={e + i + i} className="border-2 border-gray-300 mx-0 rounded-3xl border-opacity-80" style={{width:"70px", height:"35px", backgroundColor:"white", color:'#707070', display:"flex", justifyContent:"center", alignItems:"center", fontSize:"10pt", fontFamily:"laylaSquare", marginLeft:"8px"}}>
                                        <div  key={e + i} style={{marginLeft:"0px", color:"#707070"}}>{stage[i]}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                    if(e.length == 6){
                        return (
                            <Link href={'/visit/desktop/ko/pages/' + stage_ccl[i]}>
                                <div key={e}>
                                    <div  key={e + i} className="border-2 border-gray-300 mx-0 rounded-3xl border-opacity-80" style={{width:"100px", height:"35px", backgroundColor:"white", color:'#707070', display:"flex", justifyContent:"center", alignItems:"center", fontSize:"10pt", fontFamily:"laylaSquare", marginLeft:"8px"}}>
                                        <div key={e + i + i} style={{marginLeft:"0px", color:"#707070"}}>{stage[i]}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                    if(e.length == 4){
                        return (
                            <Link href={'/visit/desktop/ko/pages/' + stage_ccl[i]}>
                                <div key={e}>
                                    <div key={e + i} className="border-2 border-gray-300 mx-0 rounded-3xl border-opacity-80" style={{width:"80px", height:"35px", backgroundColor:"white", color:'#707070', display:"flex", justifyContent:"center", alignItems:"center", fontSize:"10pt", fontFamily:"laylaSquare", marginLeft:"8px"}}>
                                        <div key={e + i + i} style={{marginLeft:"0px", color:"#707070"}}>{stage[i]}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                    return (
                        <Link href={'/visit/desktop/ko/pages/' + stage_ccl[i]}>
                            <div key={e}>
                                <div key={e + i} className="border-2 border-gray-300 mx-0 rounded-3xl border-opacity-80" style={{width:"60px", height:"35px", backgroundColor:"white", color:'#707070', display:"flex", justifyContent:"center", alignItems:"center", fontSize:"10pt", fontFamily:"laylaSquare", marginLeft:"8px"}}>
                                    <div key={e + i + i} style={{marginLeft:"0px", color:"#707070"}}>{stage[i]}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export { CNAV }