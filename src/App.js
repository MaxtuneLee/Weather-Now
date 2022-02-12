import "./App.css";
import { weatherId, weatherIp } from "./weatherApi";
import React, { Fragment, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Divider,
  Cascader,
  Card,
  Typography,
  AutoComplete,
  Progress,
  Skeleton,
} from "antd";
import options from "./cities.js";
import Icon, {
  EnvironmentFilled,
  FieldTimeOutlined,
  CalendarOutlined,
  createFromIconfontCN,
  DashboardOutlined,
  BulbOutlined,
  SkinOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { Sunny,Cloudy,Drizzle,Raining,Shower,Frosty,Thunder,Snowing,Mist } from "./icons";
import axios from "axios";
import { param } from "jquery";
import "./axiosjsonp";
import reactDom from "react-dom";
import "./iconfont";
import SubMenu from "antd/lib/menu/SubMenu";

const { Title } = Typography;
const { Meta } = Card;
const SunnyIcon = (props) => <Icon component={Sunny} {...props} />;
const CloudyIcon = (props) => <Icon component={Cloudy} {...props} />;
const DrizzleIcon = (props) => <Icon component={Drizzle} {...props} />;
const RainingIcon = (props) => <Icon component={Raining} {...props} />;
const ShowerIcon = (props) => <Icon component={Shower} {...props} />;
const FrostyIcon = (props) => <Icon component={Frosty} {...props} />;
const ThunderIcon = (props) => <Icon component={Thunder} {...props} />;
const SnowingIcon = (props) => <Icon component={SnowingIcon} {...props} />;
const MistIcon = (props) => <Icon component={Mist} {...props} />;
const { Header, Footer, Content } = Layout;
let city, tem, temDay, temNight, weatherDayImg, weatherDay;

class App extends React.Component {
  state = {
    city: "",
    data: [],
    aqi: {},
  };
  updateData = (city) => {
    console.log(city);
    this.setState({ city });
    axios
      .get("https://v0.yiketianqi.com/api", {
        params: {
          appid: "23035354",
          appsecret: "8YvlPNrz",
          version: "v9",
          city: city,
        },
      })
      .then((response) => {
        this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentWillMount() {
    axios
      .get("https://v0.yiketianqi.com/api", {
        params: {
          appid: "23035354",
          appsecret: "8YvlPNrz",
          version: "v9",
          city: this.state.city,
        },
      })
      .then((response) => {
        this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <Layout>
        <HeaderWN {...this.state} updateData={this.updateData} />
        <ContentWN {...this.state} />
        <Footer>&copy;2022 Maxtune version 1.2</Footer>
      </Layout>
    );
  }
}

function IconsView(weaImg){
  switch(weaImg.weaImg){
    case 'xue':
      return <SnowingIcon />
    case 'lei':
      return <ThunderIcon />
    case 'wu':
      return <MistIcon />
    case 'bingbao':
      return <FrostyIcon />
    case 'yun':
      return <CloudyIcon />
    case 'yu':
      return <RainingIcon />
    case 'yin':
      return <CloudyIcon />
    case 'qing':
      return <SunnyIcon />
    default:
      return <SunnyIcon />
  }
}

class HeaderWN extends React.Component {
  render() {
    let { city, data, aqi } = this.props;
    console.log("header city is:", city);
    return (
      <Header className="Header">
        <Row justify="space-between" align="middle">
          <span className="title">Weather Now</span>
          <div>
            <CitySwitcher localcity={city} updateData={this.props.updateData}/>
          </div>
        </Row>
      </Header>
    );
  }
}

class ContentWN extends React.Component {
  state = {
    data: this.props
  }
  componentDidMount() {
    setTimeout(()=>{
      this.setState({data:this.props})
    },1000)
  }
  componentWillReceiveProps(){
    setTimeout(()=>{
      this.setState({data:this.props})
    },1000)
  }
  render() {
    let { city, data, aqi } = this.state.data;
    console.log("contentWN is:", this.state);
    return (
      <Content className="content">
        <div
          className="Box"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <MainCard {...this.state.data} />
          <HourData {...this.state.data} />
          <SevenDayData {...this.state.data} />
          <AqiData {... this.state.data} />
          <Life {...this.state.data}/>
        </div>
      </Content>
    );
  }
}

class CitySwitcher extends React.Component {
  state = {
    text: "正在加载",
    loading:true,
  };
  onChange = (value, selectedOptions) => {
    this.setState({
      text: selectedOptions.map((o) => o.label).join(", "),
    });
    city = selectedOptions[selectedOptions.length - 2].value;
    city = city.substring(0,city.length-1)
    // console.log(city.substring(0,city.length-1));
    this.props.updateData(city)
  };
  componentWillMount() {
    setTimeout(() => {
      if (this.props!=undefined) this.setState({loading:false})
      else document.location.reload()
      this.setState({ text: this.props.localcity });
    }, 2000);
  }
  render() {
    return (
      <span>
        <EnvironmentFilled style={{ color: "rgb(39, 39, 39)" }} />
        &nbsp;
        <span className="cityName">{this.state.text}</span>
        &nbsp;
        <Cascader options={options} onChange={this.onChange}>
          <a href="#">更改</a>
        </Cascader>
      </span>
    );
  }
}

class MainCard extends React.Component {
  state = {
    greet: "?_? 天气数据正在加载",
    tem: "--",
    temDay: "--",
    temNight: "--",
    weatherDayImg:undefined,
    loading:true,
  };
  greet(wea,aqi) {
    if (aqi>60){
      return ": ( 空气也忒差了，呆家里吧，出去要戴口罩"
    }
    if (wea === "晴") {
      return ": ) 天气不错，出去走走吧，记得戴口罩！";
    }
    if (wea === "阴" || wea === "多云") {
      return ": | 今天是天气一般呢，但也可以出去走走";
    }
    if (wea === "小雨" || wea === "暴雨") {
      return ": ( 今天居然下雨了。。睡个懒觉吧";
    }
    if (wea === "小雪") {
      return ": ) 下雪咯，好欸！！";
    } else {
      return ": ) 又是新的一天呢，也要干劲满满哦";
    }
  }

  componentDidMount() {
    setTimeout(() => {
      let localData = this.props;
      if (localData!=undefined) this.setState({loading:false})
      else document.location.reload();
      console.log("maincard datatem is:", localData.data[0].tem);
      this.setState({
        greet: this.greet(localData.data[0].wea_day,localData.data[0].air),
        tem: localData.data[0].tem,
        temDay: localData.data[0].tem1,
        temNight: localData.data[0].tem2,
        weatherDayImg: localData.data[0].wea_img,
      });
    }, 2000);
  }
  componentWillReceiveProps(){
    this.setState({loading:true})
    setTimeout(() => {
      let localData = this.props;
      if (localData!==undefined) this.setState({loading:false})
      else document.location.reload();
      console.log("maincard datatem is:", localData.data[0].tem);
      this.setState({
        greet: this.greet(localData.data[0].wea_day,localData.data[0].air),
        tem: localData.data[0].tem,
        temDay: localData.data[0].tem1,
        temNight: localData.data[0].tem2,
        weatherDayImg: localData.data[0].wea_img,
      });
    }, 2000);
  }
  render() {
    return (
      <Row justify="space-between" align="middle" className="mainCard">
        <Skeleton loading={this.state.loading} active paragraph={{rows:1}} round title={{width:'400px'}}>
          <div className="greet"> {this.state.greet}</div>
        <div className="weatherCard">
          <span className="tempreture">{this.state.tem}°C</span>
          <div className="dayAndNight">
            <span>日间 {this.state.temDay}°C</span>
            <span>夜间 {this.state.temNight}°C</span>
          </div>
          <div className="tempNow">
          <IconsView weaImg={this.state.weatherDayImg}/>
          </div>
        </div>
        </Skeleton>
      </Row>
    );
  }
}

class HourData extends React.Component {
  state={
    hour0:'--',
    weaimg0:undefined,
    tem0:'--',
    hour1:'--',
    weaimg1:undefined,
    tem1:'--',
    hour2:'--',
    weaimg2:undefined,
    tem2:'--',
    hour3:'--',
    weaimg3:undefined,
    tem3:'--',
    hour4:'--',
    weaimg4:undefined,
    tem4:'--',
    hour5:'--',
    weaimg5:undefined,
    tem5:'--',
    hour6:'--',
    weaimg6:undefined,
    tem6:'--',
    hour7:'--',
    weaimg7:undefined,
    tem7:'--',
    hour8:'--',
    weaimg8:undefined,
    tem8:'--',
    hour9:'--',
    weaimg9:undefined,
    tem9:'--',
    hour10:'--',
    weaimg10:undefined,
    tem10:'--',
    hour11:'--',
    weaimg11:undefined,
    tem11:'--',
    loading:true,
  }
  componentDidMount() {
    setTimeout(() => {
      let localData = this.props;
      if (localData!=undefined) {this.setState({loading:false})}
      else document.location.reload();
      console.log("HourData datatem is:", localData.data[0].tem);
      this.setState({
        hour0:localData.data[0].hours[0].hours,
        weaimg0:localData.data[0].hours[0].wea_img,
        tem0:localData.data[0].hours[0].tem,
        hour1:localData.data[0].hours[1].hours,
        weaimg1:localData.data[0].hours[1].wea_img,
        tem1:localData.data[0].hours[1].tem,
        hour2:localData.data[0].hours[2].hours,
        weaimg2:localData.data[0].hours[2].wea_img,
        tem2:localData.data[0].hours[2].tem,
        hour3:localData.data[0].hours[3].hours,
        weaimg3:localData.data[0].hours[3].wea_img,
        tem3:localData.data[0].hours[3].tem,
        hour4:localData.data[0].hours[4].hours,
        weaimg4:localData.data[0].hours[4].wea_img,
        tem4:localData.data[0].hours[4].tem,
        hour5:localData.data[0].hours[5].hours,
        weaimg5:localData.data[0].hours[5].wea_img,
        tem5:localData.data[0].hours[5].tem,
        hour6:localData.data[0].hours[6].hours,
        weaimg6:localData.data[0].hours[6].wea_img,
        tem6:localData.data[0].hours[6].tem,
        hour7:localData.data[0].hours[7].hours,
        weaimg7:localData.data[0].hours[7].wea_img,
        tem7:localData.data[0].hours[7].tem,
        hour8:localData.data[0].hours[8].hours,
        weaimg8:localData.data[0].hours[8].wea_img,
        tem8:localData.data[0].hours[8].tem,
        hour9:localData.data[0].hours[9].hours,
        weaimg9:localData.data[0].hours[9].wea_img,
        tem9:localData.data[0].hours[9].tem,
        hour10:localData.data[0].hours[10].hours,
        weaimg10:localData.data[0].hours[10].wea_img,
        tem10:localData.data[0].hours[10].tem,
        hour11:localData.data[0].hours[11].hours,
        weaimg11:localData.data[0].hours[11].wea_img,
        tem11:localData.data[0].hours[11].tem,
      });
    }, 2000);
  }
  componentWillReceiveProps(){
    this.setState({loading:true})
    setTimeout(() => {
      let localData = this.props;
      if (localData!=undefined) {this.setState({loading:false})}
      else document.location.reload();
      console.log("HourData datatem is:", localData.data[0].tem);
      this.setState({
        hour0:localData.data[0].hours[0].hours,
        weaimg0:localData.data[0].hours[0].wea_img,
        tem0:localData.data[0].hours[0].tem,
        hour1:localData.data[0].hours[1].hours,
        weaimg1:localData.data[0].hours[1].wea_img,
        tem1:localData.data[0].hours[1].tem,
        hour2:localData.data[0].hours[2].hours,
        weaimg2:localData.data[0].hours[2].wea_img,
        tem2:localData.data[0].hours[2].tem,
        hour3:localData.data[0].hours[3].hours,
        weaimg3:localData.data[0].hours[3].wea_img,
        tem3:localData.data[0].hours[3].tem,
        hour4:localData.data[0].hours[4].hours,
        weaimg4:localData.data[0].hours[4].wea_img,
        tem4:localData.data[0].hours[4].tem,
        hour5:localData.data[0].hours[5].hours,
        weaimg5:localData.data[0].hours[5].wea_img,
        tem5:localData.data[0].hours[5].tem,
        hour6:localData.data[0].hours[6].hours,
        weaimg6:localData.data[0].hours[6].wea_img,
        tem6:localData.data[0].hours[6].tem,
        hour7:localData.data[0].hours[7].hours,
        weaimg7:localData.data[0].hours[7].wea_img,
        tem7:localData.data[0].hours[7].tem,
        hour8:localData.data[0].hours[8].hours,
        weaimg8:localData.data[0].hours[8].wea_img,
        tem8:localData.data[0].hours[8].tem,
        hour9:localData.data[0].hours[9].hours,
        weaimg9:localData.data[0].hours[9].wea_img,
        tem9:localData.data[0].hours[9].tem,
        hour10:localData.data[0].hours[10].hours,
        weaimg10:localData.data[0].hours[10].wea_img,
        tem10:localData.data[0].hours[10].tem,
        hour11:localData.data[0].hours[11].hours,
        weaimg11:localData.data[0].hours[11].wea_img,
        tem11:localData.data[0].hours[11].tem,
      });
    }, 2000);
  }
  render(){
    return(
      <div className="hourData">
            <Title level={4}>
              <FieldTimeOutlined /> 逐小时天气
            </Title>
            <Skeleton loading={this.state.loading} active paragraph={{rows:3}}>
            <div className="hours">
              {/* 逐步小时卡片开始 */}
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour0}</span>
                <IconsView weaImg={this.state.weaimg0}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem0}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour1}</span>
                <IconsView weaImg={this.state.weaimg1}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem1}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour2}</span>
                <IconsView weaImg={this.state.weaimg2}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem2}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour3}</span>
                <IconsView weaImg={this.state.weaimg3}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem3}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour4}</span>
                <IconsView weaImg={this.state.weaimg4}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem4}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour5}</span>
                <IconsView weaImg={this.state.weaimg5}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem5}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour6}</span>
                <IconsView weaImg={this.state.weaimg6}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem6}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour7}</span>
                <IconsView weaImg={this.state.weaimg7}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem7}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour8}</span>
                <IconsView weaImg={this.state.weaimg8}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem8}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour9}</span>
                <IconsView weaImg={this.state.weaimg9}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem9}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour10}</span>
                <IconsView weaImg={this.state.weaimg10}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem10}°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100, height: 150 }}
                bordered={false}
                className="hour"
              >
                <span style={{ color: "#8a9baf" }}>{this.state.hour11}</span>
                <IconsView weaImg={this.state.weaimg11}/>
                <span style={{ fontSize: "20px" }}>{this.state.tem11}°C</span>
              </Card>
              {/* 逐步小时卡片结束 */}
            </div>
            </Skeleton>
          </div>
    );
  }
}

class SevenDayData extends React.Component {
  state = {
    day1:'--',
    day2:'--',
    day3:'--',
    day4:'--',
    day5:'--',
    day6:'--',
    day7:'--',
    weaImg1:undefined,
    weaImg2:undefined,
    weaImg3:undefined,
    weaImg4:undefined,
    weaImg5:undefined,
    weaImg6:undefined,
    weaImg7:undefined,
    temDay1:'--',
    temDay2:'--',
    temDay3:'--',
    temDay4:'--',
    temDay5:'--',
    temDay6:'--',
    temDay7:'--',
    temNight1:'--',
    temNight2:'--',
    temNight3:'--',
    temNight4:'--',
    temNight5:'--',
    temNight6:'--',
    temNight7:'--',
    loading:true,
  }
  componentDidMount() {
    setTimeout(() => {
      let localData = this.props;
      if (localData!=undefined) this.setState({loading:false})
      else document.location.reload();
      console.log("sevenDayData datatem is:", localData.data[0].tem);
      this.setState({
        day1:localData.data[0].week.charAt(localData.data[0].week.length-1),
        day2:localData.data[1].week.charAt(localData.data[1].week.length-1),
        day3:localData.data[2].week.charAt(localData.data[2].week.length-1),
        day4:localData.data[3].week.charAt(localData.data[3].week.length-1),
        day5:localData.data[4].week.charAt(localData.data[4].week.length-1),
        day6:localData.data[5].week.charAt(localData.data[5].week.length-1),
        day7:localData.data[6].week.charAt(localData.data[6].week.length-1),
        weaImg1:localData.data[0].wea_img,
        weaImg2:localData.data[1].wea_img,
        weaImg3:localData.data[2].wea_img,
        weaImg4:localData.data[3].wea_img,
        weaImg5:localData.data[4].wea_img,
        weaImg6:localData.data[5].wea_img,
        weaImg7:localData.data[6].wea_img,
        temDay1:localData.data[0].tem1,
        temDay2:localData.data[1].tem1,
        temDay3:localData.data[2].tem1,
        temDay4:localData.data[3].tem1,
        temDay5:localData.data[4].tem1,
        temDay6:localData.data[5].tem1,
        temDay7:localData.data[6].tem1,
        temNight1:localData.data[0].tem2,
        temNight2:localData.data[1].tem2,
        temNight3:localData.data[2].tem2,
        temNight4:localData.data[3].tem2,
        temNight5:localData.data[4].tem2,
        temNight6:localData.data[5].tem2,
        temNight7:localData.data[6].tem2,
      });
    }, 2000);
  }
  componentWillReceiveProps(){
    this.setState({loading:true})
    setTimeout(() => {
      let localData = this.props;
      if (localData!=undefined) this.setState({loading:false})
      else document.location.reload();
      console.log("sevenDayData datatem is:", localData.data[0].tem);
      this.setState({
        day1:localData.data[0].week.charAt(localData.data[0].week.length-1),
        day2:localData.data[1].week.charAt(localData.data[1].week.length-1),
        day3:localData.data[2].week.charAt(localData.data[2].week.length-1),
        day4:localData.data[3].week.charAt(localData.data[3].week.length-1),
        day5:localData.data[4].week.charAt(localData.data[4].week.length-1),
        day6:localData.data[5].week.charAt(localData.data[5].week.length-1),
        day7:localData.data[6].week.charAt(localData.data[6].week.length-1),
        weaImg1:localData.data[0].wea_img,
        weaImg2:localData.data[1].wea_img,
        weaImg3:localData.data[2].wea_img,
        weaImg4:localData.data[3].wea_img,
        weaImg5:localData.data[4].wea_img,
        weaImg6:localData.data[5].wea_img,
        weaImg7:localData.data[6].wea_img,
        temDay1:localData.data[0].tem1,
        temDay2:localData.data[1].tem1,
        temDay3:localData.data[2].tem1,
        temDay4:localData.data[3].tem1,
        temDay5:localData.data[4].tem1,
        temDay6:localData.data[5].tem1,
        temDay7:localData.data[6].tem1,
        temNight1:localData.data[0].tem2,
        temNight2:localData.data[1].tem2,
        temNight3:localData.data[2].tem2,
        temNight4:localData.data[3].tem2,
        temNight5:localData.data[4].tem2,
        temNight6:localData.data[5].tem2,
        temNight7:localData.data[6].tem2,
      });
    }, 2000);
  }
  render(){
    return(
      <div className="dayData">
            <Title level={4}>
              <CalendarOutlined /> 七天天气
            </Title>
            <Skeleton loading={this.state.loading} active paragraph={{rows:23}}>
            <div className="sevenDays">
              <Card
                hoverable
                style={{ width: "auto", height: 100 }}
                bordered={false}
                className="day"
              >
                <Row justify="center" align="middle">
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#8a9baf",
                    }}
                    className="dayFont"
                  >
                    周{this.state.day1}
                  </span>
                  <IconsView weaImg={this.state.weaImg1}/>
                  <div>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      夜间{this.state.temNight1}°C
                    </span>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      日间{this.state.temDay1}°C
                    </span>
                  </div>
                </Row>
              </Card>
              <Card
                hoverable
                style={{ width: "auto", height: 100 }}
                bordered={false}
                className="day"
              >
                <Row justify="center" align="middle">
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#8a9baf",
                    }}
                    className="dayFont"
                  >
                    周{this.state.day2}
                  </span>
                  <IconsView weaImg={this.state.weaImg2}/>
                  <div>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      夜间{this.state.temNight2}°C
                    </span>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      日间{this.state.temDay2}°C
                    </span>
                  </div>
                </Row>
              </Card>
              <Card
                hoverable
                style={{ width: "auto", height: 100 }}
                bordered={false}
                className="day"
              >
                <Row justify="center" align="middle">
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#8a9baf",
                    }}
                    className="dayFont"
                  >
                    周{this.state.day3}
                  </span>
                  <IconsView weaImg={this.state.weaImg3}/>
                  <div>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      夜间{this.state.temNight3}°C
                    </span>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      日间{this.state.temDay3}°C
                    </span>
                  </div>
                </Row>
              </Card>
              <Card
                hoverable
                style={{ width: "auto", height: 100 }}
                bordered={false}
                className="day"
              >
                <Row justify="center" align="middle">
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#8a9baf",
                    }}
                    className="dayFont"
                  >
                    周{this.state.day4}
                  </span>
                  <IconsView weaImg={this.state.weaImg4}/>
                  <div>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      夜间{this.state.temNight4}°C
                    </span>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      日间{this.state.temDay4}°C
                    </span>
                  </div>
                </Row>
              </Card>
              <Card
                hoverable
                style={{ width: "auto", height: 100 }}
                bordered={false}
                className="day"
              >
                <Row justify="center" align="middle">
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#8a9baf",
                    }}
                    className="dayFont"
                  >
                    周{this.state.day5}
                  </span>
                  <IconsView weaImg={this.state.weaImg5}/>
                  <div>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      夜间{this.state.temNight5}°C
                    </span>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      日间{this.state.temDay5}°C
                    </span>
                  </div>
                </Row>
              </Card>
              <Card
                hoverable
                style={{ width: "auto", height: 100 }}
                bordered={false}
                className="day"
              >
                <Row justify="center" align="middle">
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#8a9baf",
                    }}
                    className="dayFont"
                  >
                    周{this.state.day6}
                  </span>
                  <IconsView weaImg={this.state.weaImg6}/>
                  <div>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      夜间{this.state.temNight6}°C
                    </span>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      日间{this.state.temDay6}°C
                    </span>
                  </div>
                </Row>
              </Card>
              <Card
                hoverable
                style={{ width: "auto", height: 100 }}
                bordered={false}
                className="day"
              >
                <Row justify="center" align="middle">
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#8a9baf",
                    }}
                    className="dayFont"
                  >
                    周{this.state.day7}
                  </span>
                  <IconsView weaImg={this.state.weaImg7}/>
                  <div>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      夜间{this.state.temNight7}°C
                    </span>
                    <span
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      className="dayFont"
                    >
                      日间{this.state.temDay7}°C
                    </span>
                  </div>
                </Row>
              </Card>
            </div>
            </Skeleton>
      </div>
    )
  }
}

class AqiData extends React.Component {
  state={
    aqi:'-',
    aqiNum:'--',
    aqiSuggest:'空气建议加载中',
    loading:true,
  }
  componentDidMount() {
    setTimeout(() => {
      let localData = this.props;
      if (localData!=undefined) this.setState({loading:false})
      else document.location.reload();
      console.log("maincard datatem is:", localData.data[0].tem);
      this.setState({
        aqi:localData.data[0].air_level,
        aqiNum:localData.data[0].air,
        aqiSuggest:localData.data[0].air_tips
      });
    }, 2000);
  }
  componentWillReceiveProps(){
    this.setState({loading:true})
    setTimeout(() => {
      let localData = this.props;
      if (localData!=undefined) this.setState({loading:false})
      else document.location.reload();
      console.log("maincard datatem is:", localData.data[0].tem);
      this.setState({
        aqi:localData.data[0].air_level,
        aqiNum:localData.data[0].air,
        aqiSuggest:localData.data[0].air_tips
      });
    }, 2000);
  }
  render(){
    return(
      <div className="aqi">
            <Title level={4}>
              <CalendarOutlined /> Aqi(CN)空气质量指数
            </Title>
            <Skeleton loading={this.state.loading} active paragraph={{rows:1}} round title={{width:'500px'}}>
            <span style={{ fontSize: "20px" }}>{this.state.aqiNum} - {this.state.aqi}</span>
            <br />
            <span style={{ fontSize: "15px", marginBottom: "15px" }}>
              {this.state.aqiSuggest}
            </span>
            <Progress
              strokeColor={{
                "0%": "#00de04",
                "50%": "#ffee03",
                "100%": "#8a0000",
              }}
              percent={((this.state.aqiNum/500)*100).toFixed(1)}
              status="active"
            />
            </Skeleton>
          </div>
    )
  }
}

class Life extends React.Component {
  state={
    shidu:'--',
    fengsu:'--',
    fengsuLevel:'--',
    ziwaixianLevel:'--',
    ziwaixianSuggest:'--',
    chuanyiLevel:'--',
    chuanyiSuggest:'--',
    loading:true,
  }
  componentDidMount() {
    setTimeout(() => {
      let localData = this.props;
      if (localData!=undefined) this.setState({loading:false})
      else document.location.reload();
      console.log("life datatem is:", localData.data[0].humidity.substring(0,2));
      this.setState({
        shidu:localData.data[0].humidity.substring(0, localData.data[0].humidity.length - 1),
        fengsu:localData.data[0].win_meter.substring(0, localData.data[0].win_meter.length - 4),
        fengsuLevel:localData.data[0].win_speed,
        ziwaixianLevel:localData.data[0].index[0].level,
        ziwaixianSuggest:localData.data[0].index[0].desc,
        chuanyiLevel:localData.data[0].index[3].level,
        chuanyiSuggest:localData.data[0].index[3].desc,
      });
    }, 2000);
  }
  componentWillReceiveProps(){
    this.setState({loading:true})
    setTimeout(() => {
      let localData = this.props;
      if (localData!=undefined) this.setState({loading:false})
      else document.location.reload();
      console.log("life datatem is:", localData.data[0].humidity.substring(0,2));
      this.setState({
        shidu:localData.data[0].humidity.substring(0, localData.data[0].humidity.length - 1),
        fengsu:localData.data[0].win_meter.substring(0, localData.data[0].win_meter.length - 4),
        fengsuLevel:localData.data[0].win_speed,
        ziwaixianLevel:localData.data[0].index[0].level,
        ziwaixianSuggest:localData.data[0].index[0].desc,
        chuanyiLevel:localData.data[0].index[3].level,
        chuanyiSuggest:localData.data[0].index[3].desc,
      });
    }, 2000);
  }
  ziwaixianLeveltoNumber(level){
    switch(level){
      case '最弱':
        return 20;
      case '弱':
        return 40;
      case '中等':
        return 60;
      case '强':
        return 80;
      case '很强':
        return 100;
      default:
        return 0;
    }
  }
  render(){
    return(
      <div className="life">
        <div className="lifeBox">
          <Title level={4}>
          <FlagOutlined />  风速
          </Title>
          <Skeleton loading={this.state.loading} active paragraph={{rows:5}}>
          <div className="fengSuProgress">
            <Progress type="dashboard" percent={this.state.fengsu} status="active" width={190} strokeColor='#ffa963' format={(percent)=>{return percent+'km/h'}}/>
          </div>
          <div className="windSpeedLevel">{this.state.fengsuLevel}</div>
          </Skeleton>
        </div>
        <div className="lifeBox">
          <Title level={4}>
            <DashboardOutlined /> 空气湿度
          </Title>
          <Skeleton loading={this.state.loading} active paragraph={{rows:5}}>
          <div className="shiDuProgress">
            <Progress type="dashboard" percent={this.state.shidu} status="active" width={230} strokeColor='#63beff'/>
          </div>
          </Skeleton>
        </div>
        <div className="lifeBox">
          <Title level={4}>
            <SkinOutlined /> 穿衣建议
          </Title>
          <Skeleton loading={this.state.loading} active paragraph={{rows:5}}>
          <div className="ziWaiXian">
          <div className="ziWaiXianData">{this.state.chuanyiLevel}</div>
          <div className="ziWaiXianSuggest">{this.state.chuanyiSuggest}</div>
          </div>
          </Skeleton>
        </div>
        <div className="lifeBox">
        <Title level={4}>
            <BulbOutlined /> 紫外线指数
          </Title>
          <Skeleton loading={this.state.loading} active paragraph={{rows:5}}>
          <div className="ziWaiXian">
          <div className="ziWaiXianData">{this.state.ziwaixianLevel}</div>
          <Progress percent={this.ziwaixianLeveltoNumber(this.state.ziwaixianLevel)} steps={10} strokeColor='#bb63ff' width={30} strokeLinecap='round'/>
          <div className="ziWaiXianSuggest">{this.state.ziwaixianSuggest}</div>
          </div>
          </Skeleton>
        </div>
      </div>
    )
  }
}

export default App;
