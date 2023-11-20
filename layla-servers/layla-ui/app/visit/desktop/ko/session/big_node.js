export default function NODE(props){
    // props 로 타입을 받아서 타입에 따라 content, writer를 DB에서 조회
    let content = ['귀환한 마신은 \n 만렙 플레이어', '무공 쓰는 \n 외과 의사', '질풍무사', '무기왕이 헌터로 회귀했다', '눈 감고 3점 슛', '남궁세가 천재 외손자']
    let writer = ['은월', '세아', '인하', '시린', '스카이캐슬', '몬드','리월', '스네즈나야','수메르', '하루']
    return (
        <div className="cps-bdg">
            <div className="cps-title">
                {props.page}
            </div>
            <div className="cps-nn">
                {
                    content.map((item, index)=>{
                        return (
                            <div className="np-ob">
                                <div className="textbox">
                                    <div className="xtitle" style={{textAlign:"center"}}>
                                        {content[index]}
                                    </div>
                                    <div className="xwriter" style={{textAlign:"center"}}>
                                        {writer[index]}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export { NODE }