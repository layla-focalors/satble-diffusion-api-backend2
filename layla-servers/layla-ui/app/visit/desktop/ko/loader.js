'use client'
import { HiOutlineMagnifyingGlass } from "react-icons/hi2"

export default function Loader(){
    return (
        <div style={{display:"flex", justifyContent:"left", alignItems:"center", marginTop:"5px"}}>
            <input className="delete" style={{border:"none", width:"75%", marginTop:"0px", marginLeft:"10px", color:"black"}} type="search" placeholder="제목, 작가를 입력하세요">
            </input>
            <HiOutlineMagnifyingGlass id="iconsA" style={{marginLeft:"5px", color:"black !important"}}/>
        </div>
    )
}

export { Loader }