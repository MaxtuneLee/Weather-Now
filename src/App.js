import './App.css';
import {weatherId,weatherIp} from './weatherApi';
import React,{ Fragment, useState } from 'react';
import {Layout, Row, Col, Divider, Cascader, Card, Typography, AutoComplete,Progress} from 'antd';
import options from  './cities.js'
import Icon,{EnvironmentFilled,FieldTimeOutlined,CalendarOutlined,createFromIconfontCN} from '@ant-design/icons'
import {Sunny} from './icons'
import axios from 'axios';
import { param } from 'jquery';
import './axiosjsonp'
import reactDom from 'react-dom';
import './iconfont'


const {Title} = Typography;
const {Meta} = Card;
const SunnyIcon = props => <Icon component={Sunny} {...props} />;
const {Header, Footer, Content} = Layout
let city,tem,temDay,temNight,weatherDayImg,weatherDay;
const IconFont = createFromIconfontCN({
  scriptUrl:'//at.alicdn.com/t/font_3157781_ce79q9xjds9.js'
})

class App extends React.Component {
  state={
    city:'',
    data:[],
    aqi:{}
  }
  updateData=(city)=>{
    console.log(city)
    this.setState({city})
  }
  componentWillMount(){
    axios.get('https://v0.yiketianqi.com/api',{
      params:{
        appid:'23035354',
        appsecret:'8YvlPNrz',
        version:'v9',
        city:'海南',
      }
    }).then(
      (response)=>{
        console.log(response.data);
        this.setState(response.data)
        console.log(this.state)
      }
    )
    .catch(function (error) {
      console.log(error)
    })
  }
  render (){
    return(
      <Layout>
        <HeaderWN {...this.state}/>
        <ContentWN {...this.state} updateData={this.props.updateData}/>
        <Footer>&copy;2022 Maxtune</Footer>
      </Layout>
      )
  }
}

class HeaderWN extends React.Component {
  render(){
    let {city,data,aqi} = this.props
    console.log('header city is:',city)
    return (
      <Header className='Header'>
          <Row justify="space-between" align="middle">
            <span className='title'>Weather Now</span>
            <div>
              <EnvironmentFilled style={{color:'rgb(39, 39, 39)'}}/>
              &nbsp;
              <CitySwitcher localcity={city}/>
            </div>
          </Row>
        </Header>
    )
  }
}

class ContentWN extends React.Component {
  render(){
    let {city,data,aqi} = this.props
    console.log('contentWN city is:',city)
    return(
      <Content className='content'>
          <div className='Box' style={{marginLeft:'auto',marginRight:'auto'}}>
            <MainCard {...this.props}/>
            <div className='hourData'>
              <Title level={4}><FieldTimeOutlined /> 逐小时天气</Title>
              <div className='hours'>
              {/* 逐步小时卡片开始 */}
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              <Card
                hoverable
                style={{ width: 100,height:150 }}
                bordered={false}
                className='hour'
              >
                <span style={{color:'#8a9baf'}}>0:00</span>
                <SunnyIcon/>
                <span style={{fontSize:'20px'}}>18°C</span>
              </Card>
              {/* 逐步小时卡片结束 */}
              </div>
            </div>
            <div className='dayData'>
            <Title level={4}><CalendarOutlined /> 七天天气</Title>
              <div className='sevenDays'>
                <Card
                    hoverable
                    style={{ width: 'auto',height:100 }}
                    bordered={false}
                    className='day'
                  >
                    <Row justify='center' align='middle'>
                      <span style={{fontSize:'20px',marginRight:'10px',color:'#8a9baf'}} className='dayFont'>周六</span>
                      <SunnyIcon/>
                      <div><span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>夜间18°C</span>
                      <span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>日间20°C</span></div>
                    </Row>
                  </Card>
                  <Card
                    hoverable
                    style={{ width: 'auto',height:100 }}
                    bordered={false}
                    className='day'
                  >
                    <Row justify='center' align='middle'>
                      <span style={{fontSize:'20px',marginRight:'10px',color:'#8a9baf'}} className='dayFont'>周六</span>
                      <SunnyIcon/>
                      <div><span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>夜间18°C</span>
                      <span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>日间20°C</span></div>
                    </Row>
                  </Card><Card
                    hoverable
                    style={{ width: 'auto',height:100 }}
                    bordered={false}
                    className='day'
                  >
                    <Row justify='center' align='middle'>
                      <span style={{fontSize:'20px',marginRight:'10px',color:'#8a9baf'}} className='dayFont'>周六</span>
                      <SunnyIcon/>
                      <div><span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>夜间18°C</span>
                      <span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>日间20°C</span></div>
                    </Row>
                  </Card><Card
                    hoverable
                    style={{ width: 'auto',height:100 }}
                    bordered={false}
                    className='day'
                  >
                    <Row justify='center' align='middle'>
                      <span style={{fontSize:'20px',marginRight:'10px',color:'#8a9baf'}} className='dayFont'>周六</span>
                      <SunnyIcon/>
                      <div><span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>夜间18°C</span>
                      <span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>日间20°C</span></div>
                    </Row>
                  </Card><Card
                    hoverable
                    style={{ width: 'auto',height:100 }}
                    bordered={false}
                    className='day'
                  >
                    <Row justify='center' align='middle'>
                      <span style={{fontSize:'20px',marginRight:'10px',color:'#8a9baf'}} className='dayFont'>周六</span>
                      <SunnyIcon/>
                      <div><span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>夜间18°C</span>
                      <span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>日间20°C</span></div>
                    </Row>
                  </Card><Card
                    hoverable
                    style={{ width: 'auto',height:100 }}
                    bordered={false}
                    className='day'
                  >
                    <Row justify='center' align='middle'>
                      <span style={{fontSize:'20px',marginRight:'10px',color:'#8a9baf'}} className='dayFont'>周六</span>
                      <SunnyIcon/>
                      <div><span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>夜间18°C</span>
                      <span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>日间20°C</span></div>
                    </Row>
                  </Card><Card
                    hoverable
                    style={{ width: 'auto',height:100 }}
                    bordered={false}
                    className='day'
                  >
                    <Row justify='center' align='middle'>
                      <span style={{fontSize:'20px',marginRight:'10px',color:'#8a9baf'}} className='dayFont'>周六</span>
                      <SunnyIcon/>
                      <div><span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>夜间18°C</span>
                      <span style={{fontSize:'20px',marginLeft:'10px'}} className='dayFont'>日间20°C</span></div>
                    </Row>
                  </Card>
                </div>
            </div>
            <div className='aqi'>
              <Title level={4}><CalendarOutlined /> 空气质量</Title>
              <span style={{fontSize:'20px'}}>59 - 良</span><br/>
              <span style={{fontSize:'15px',marginBottom:'15px'}}>当前AQI为 59</span>
              <Progress
                strokeColor={{
                  '0%': '#00de04',
                  '50%': '#ffee03',
                  '100%': '#8a0000',
                }}
                percent={30}
                status="active"
              />
            </div>
            <div className='life'>
              <div className='lifeBox'>
                穿衣
              </div>
              <div className='lifeBox'>
                穿衣
              </div>
              <div className='lifeBox'>
                穿衣
              </div>
              <div className='lifeBox'>
                穿衣
              </div>
            </div>
          </div>
        </Content>
    )
  }
}

class CitySwitcher extends React.Component {
  state = {
    text: '正在加载',
  };
  onChange = (value, selectedOptions) => {
    this.setState({
      text: selectedOptions.map(o => o.label).join(', '),
    });
    city = selectedOptions[selectedOptions.length-2].code;
    console.log(selectedOptions[selectedOptions.length-2].code);
  };
  componentWillMount(){
    setTimeout(() => {
      this.setState({text:this.props.localcity})
    }, 3000);
  }
  render() {
    return (
      <span>
        <span className='cityName'>{this.state.text}</span>
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
    greet: '?_? 天气数据正在加载',
    tem:'--',
    temDay:'--',
    temNight:'--',
    weatherDayImg:weatherDayImg,
  };
  greet(wea){
    if(wea==='晴'){
      return ': ) 天气不错，出去走走吧'
    }
    if(wea==='阴'||wea==='多云'){
      return ': | 今天是天气一般呢，但也可以出去走走'
    }
    if(wea==='小雨'||wea==='暴雨'){
      return ': ( 今天居然下雨了。。睡个懒觉吧'
    }
    if(wea==='小雪'){
      return ': ) 下雪咯，好欸！！'
    }
    else{
      return ': ) 又是新的一天呢，也要干劲满满哦'
    }
  };

  componentWillMount(){
    setTimeout(() => {
      let localData = this.props
      console.log('maincard datatem is:',localData.data[0].tem)
      this.setState({
        greet:this.greet(localData.data[0].wea_day),
        tem:localData.data[0].tem,
        temDay:localData.data[0].tem1,
        temNight:localData.data[0].tem2,
      })
    }, 3000);
  }
  render() {
    return (
      <Row justify='space-between' align='middle' className='mainCard'>
              <div className='greet'> {this.state.greet}</div>
              <div className='weatherCard'>
                <span className='tempreture'>{this.state.tem}°C</span>
                <div className='dayAndNight'><span>日间 {this.state.temDay}°C</span><span>夜间 {this.state.temNight}°C</span></div>
                <div className='tempNow'>
                  <SunnyIcon/>
                </div>
              </div>
            </Row>
    );
  }
}

export default App;
