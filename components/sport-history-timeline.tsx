import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"

const SportHistoryTimeline = () => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date="1896"
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<i className="fas fa-running"></i>}
      >
        <h3 className="vertical-timeline-element-title">First Modern Olympic Games</h3>
        <h4 className="vertical-timeline-element-subtitle">Athens, Greece</h4>
        <p>The first modern Olympic Games were held in Athens, Greece, marking a revival of the ancient tradition.</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="1904"
        contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
        iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        icon={<i className="fas fa-baseball-ball"></i>}
      >
        <h3 className="vertical-timeline-element-title">Baseball becomes an Olympic sport</h3>
        <h4 className="vertical-timeline-element-subtitle">St. Louis, USA</h4>
        <p>Baseball was first featured as a medal sport at the Summer Olympics in St. Louis.</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="1930"
        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<i className="fas fa-futbol"></i>}
      >
        <h3 className="vertical-timeline-element-title">First FIFA World Cup</h3>
        <h4 className="vertical-timeline-element-subtitle">Uruguay</h4>
        <p>
          The first FIFA World Cup was held in Uruguay, marking the beginning of the world's most prestigious football
          tournament.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="1992"
        contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
        iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        icon={<i className="fas fa-basketball-ball"></i>}
      >
        <h3 className="vertical-timeline-element-title">Dream Team at the Olympics</h3>
        <h4 className="vertical-timeline-element-subtitle">Barcelona, Spain</h4>
        <p>The United States sent its "Dream Team" to the Olympics, featuring NBA stars for the first time.</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2000"
        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<i className="fas fa-running"></i>}
      >
        <h3 className="vertical-timeline-element-title">Sydney Olympics</h3>
        <h4 className="vertical-timeline-element-subtitle">Sydney, Australia</h4>
        <p>The Sydney Olympics were held, showcasing incredible athletic achievements and memorable moments.</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2012"
        contentStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
        iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        icon={<i className="fas fa-medal"></i>}
      >
        <h3 className="vertical-timeline-element-title">London Olympics</h3>
        <h4 className="vertical-timeline-element-subtitle">London, UK</h4>
        <p>The London Olympics were held, marking a significant event in sports history.</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  )
}

export default SportHistoryTimeline
