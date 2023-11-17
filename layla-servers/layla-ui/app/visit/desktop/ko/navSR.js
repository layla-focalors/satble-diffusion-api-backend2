'use client'
import Link from "next/link"

export default function NAVSR(){
    function event1(data){
        return function(){
            if(data){
                document.getElementById("cr1").style.color = "#F1AF14"
                // document.getElementById('cr1').append('<div style={{b}}></div>')
            }else {
                document.getElementById("cr1").style.color = "#000000"
            }
        }
    }
    function event2(data){
        return function(){
            if(data){
                document.getElementById("cr2").style.color = "#F1AF14"
            }else {
                document.getElementById("cr2").style.color = "#000000"
            }
        }
    }
    function event3(data){
        return function(){
            if(data){
                document.getElementById("cr3").style.color = "#F1AF14"
            }else {
                document.getElementById("cr3").style.color = "#000000"
            }
        }
    }
    function event4(data){
        return function(){
            if(data){
                document.getElementById("cr4").style.color = "#F1AF14"
            }else {
                document.getElementById("cr4").style.color = "#000000"
            }
        }
    }
    function event5(data){
        return function(){
            if(data){
                document.getElementById("cr5").style.color = "#F1AF14"
            }else {
                document.getElementById("cr5").style.color = "#000000"
            }
        }
    }
    return (
        <div style={{display:"flex", marginLeft:"15px"}}>
            <Link href={'/visit/ko'}>
                <ul id="cr1" className="mx-4 laylaSquare" onMouseOver={event1(true)} onMouseLeave={event1(false)}>추천</ul>
            </Link>
            <Link href={'/visit/ko/webtoon'}>
                <ul id="cr2" className="mx-4 laylaSquare" onMouseOver={event2(true)} onMouseLeave={event2(false)}>웝툰</ul>
            </Link>
            <Link href={'/visit/ko/story'}>
                <ul id="cr3" className="mx-4 laylaSquare" onMouseOver={event3(true)} onMouseLeave={event3(false)}>웹소설</ul>
            </Link>
            <Link href={'/visit/ko/play'}>
                <ul id="cr4" className="mx-4 laylaSquare" onMouseOver={event4(true)} onMouseLeave={event4(false)}>플레이</ul>
            </Link>
            <Link href={'/visit/ko/best'}>
                <ul id="cr5" className="mx-4 laylaSquare" onMouseOver={event5(true)} onMouseLeave={event5(false)}>베스트</ul>
            </Link>
        </div>
    )
}

export {NAVSR}