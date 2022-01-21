import './App.css';
import {weatherId,weatherIp} from './weatherApi';
import React,{ Fragment, useState } from 'react';
import {Layout, Row, Col, Divider, Cascader, Card, Typography, AutoComplete,Progress} from 'antd';
import options from  './cities.js'
import Icon,{EnvironmentFilled,FieldTimeOutlined,CalendarOutlined} from '@ant-design/icons'
import {Sunny} from './icons'
import axios from 'axios';
import { param } from 'jquery';
import './axiosjsonp'
import reactDom from 'react-dom';


const {Title} = Typography;
const {Meta} = Card;
const SunnyIcon = props => <Icon component={Sunny} {...props} />;
const {Header, Footer, Sider, Content} = Layout
let city='正在定位';
let tem,temDay,temNight;

axios.get('https://v0.yiketianqi.com/api',{
  params:{
    appid:'52311237',
    appsecret:'o4CyyoqO',
    version:'v9',
    city:'广州',
  }
}).then(
  function(response){
    // console.log(response);
    city=response.data.city;
    
  }
)

function App() {
  return (
    <>
      <Layout>
        <Header className='Header'>
          <Row justify="space-between" align="middle">
            <span className='title'>Weather Now</span>
            <div>
              <EnvironmentFilled style={{color:'rgb(39, 39, 39)'}}/>
              &nbsp;
              <CitySwitcher />
            </div>
          </Row>
        </Header>
        <Content className='content'>
          <div className='Box' style={{marginLeft:'auto',marginRight:'auto'}}>
            <Row justify='space-between' align='middle' className='mainCard'>
              <div className='greet'> : ) 天气很不错，不如出去走一走吧！</div>
              <div className='weatherCard'>
                <span className='tempreture'>20°C</span>
                <div className='dayAndNight'><span>日间 25°C</span><span>夜间 18°C</span></div>
                <div className='tempNow'>
                  <SunnyIcon/>
                </div>
              </div>
            </Row>
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
        <Footer>&copy;2022 Maxtune</Footer>
      </Layout>
    </>
  );
}

class CitySwitcher extends React.Component {
  state = {
    text: city,
  };
  onChange = (value, selectedOptions) => {
    this.setState({
      text: selectedOptions.map(o => o.label).join(', '),
    });
    city = selectedOptions[selectedOptions.length-1].code;
    console.log(selectedOptions[selectedOptions.length-1].code);
  };

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

export default App; export {city};
