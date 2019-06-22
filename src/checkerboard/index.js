import React, { Component, Fragment } from 'react';

class CheckBoard extends Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.state = {
      canvasWidth: 0,  // 整个棋盘的宽高
      canvasHeight: 0,
      ceilWidth: 0,   // 每个各自的宽高
      ceilHeight: 0,
      lineWidth: 0,   // 线条长度
      checkBoardColor: "red"
    }
  }
  componentDidMount() {
    // 监听浏览器窗口大小变化
    window.onresize = () => {  
      this.computedSize();
    }
    this.computedSize();
  }
  // 计算棋盘的宽高
  computedSize() {
    const canvas = this.canvas.current;
    // 获取浏览器可使用的宽高
    const browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // 通过获取浏览器宽高中的较小值来设置棋盘大小
    let minLength = Math.min(browserWidth, browserHeight) * 0.9;
    canvas.height = Math.ceil(minLength);
    canvas.width = Math.ceil(minLength / 9 * 8);
    this.setState({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,   
      ceilWidth: canvas.width / 9,  // 内外框之间的空间占一个格子的宽高
      ceilHeight: canvas.height / 10,
      lineWidth: minLength > 500 ? 2 : 1,
    }, () => {
      // 在回调函数中绘制棋盘
      this.drawCheckerboard();
    });
    // paddingX =  ceilWidth / 2;
    // paddingY =  ceilHeight / 2;
    // boxWidth = canvasWidth - paddingX * 2;
    // boxHeight = canvasHeight - paddingY * 2 ;
    // chessSize = Math.ceil(ceilWidth * 0.4);
    // chessFontSize = Math.ceil(chessSize*0.8);
    // $(".box").width(canvasWidth).height(canvasHeight);
  }
  // 画线
  cross(sx, sy, ex, ey, bw) {
    const {ceilWidth, ceilHeight, checkBoardColor} = this.state;
    const canvas = this.canvas.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    // 需要加上内外框之间的空间
    context.moveTo(sx + ceilWidth / 2, sy + ceilHeight / 2);
    context.lineTo(ex + ceilWidth / 2, ey + ceilHeight / 2);
    context.strokeStyle =  checkBoardColor;
    context.lineWidth = bw;
    context.stroke();
    context.closePath();
  }
  // 画棋盘
  drawCheckerboard() {
    const {ceilWidth, ceilHeight, lineWidth, checkBoardColor} = this.state;
    const canvas = this.canvas.current;
    const context = canvas.getContext("2d");
    // 外框
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.state.canvasWidth, 0);
    context.lineTo(this.state.canvasWidth, this.state.canvasHeight);
    context.lineTo(0, this.state.canvasHeight);	
    context.lineTo(0, 0);
    context.lineWidth = lineWidth * 2;
    context.strokeStyle = checkBoardColor;
    context.stroke();
    context.closePath(); 
     // 横线
    for(let i=0; i<=9; i++) {
      this.cross(0, i * ceilHeight, ceilWidth * 8, i * ceilHeight, lineWidth);
    }
    // 竖线
    for(let i=0; i<=8; i++) {
      // 左右两条长竖线
      if(i === 0 || i === 8) {
        this.cross(i * ceilWidth, 0, i * ceilWidth, ceilHeight * 9, lineWidth);
      }
      else {
        // 上半棋盘的竖线
        this.cross(i * ceilWidth, 0, i * ceilWidth, 4 * ceilHeight, lineWidth);
        // 下半棋盘的竖线
        this.cross(i * ceilWidth, 5 * ceilHeight, i * ceilWidth, ceilHeight * 9, lineWidth);
      }
    }		
    // 上棋盘四宫格斜线
    this.cross(3 * ceilWidth, 0, 5 * ceilWidth, 2 * ceilHeight, lineWidth);
    this.cross(5 * ceilWidth, 0, 3 * ceilWidth, 2 * ceilHeight, lineWidth);
    // 下棋盘四宫格斜线
    this.cross(3 * ceilWidth, 7 * ceilHeight, 5 * ceilWidth, 9 * ceilHeight, lineWidth);
    this.cross(3 * ceilWidth, 9 * ceilHeight, 5 * ceilWidth, 7 * ceilHeight, lineWidth);
    let lineW = ceilWidth / 7;   // 折线的宽度
    let lineH = ceilHeight / 7;  // 折线的高度
    let disX = ceilWidth / 14;   // 折线距离边框的横向距离
    let disY = ceilHeight / 14;  // 折线距离边框的纵向距离
    // 上棋盘炮折线
    for(let i=1; i<=7; i+=6) {
      // 上棋盘左炮折线，按左上、右上、右下、左下的顺序
      this.cross(ceilWidth * i - disX - lineW, ceilHeight * 2 - disY, ceilWidth * i - disX, ceilHeight * 2 - disY, lineWidth / 2);    
      this.cross(ceilWidth * i - disX, ceilHeight * 2 - disY, ceilWidth * i - disX, ceilHeight * 2 - disY - lineH, lineWidth / 2);
      this.cross(ceilWidth * i + disX, ceilHeight * 2 - disY, ceilWidth * i + disX + lineW, ceilHeight * 2 - disY, lineWidth / 2);
      this.cross(ceilWidth * i + disX, ceilHeight * 2 - disY, ceilWidth * i + disX, ceilHeight * 2 - disY - lineH, lineWidth / 2);
      this.cross(ceilWidth * i + disX, ceilHeight * 2 + disY, ceilWidth * i + disX + lineW, ceilHeight * 2 + disY, lineWidth / 2);
      this.cross(ceilWidth * i + disX, ceilHeight * 2 + disY, ceilWidth * i + disX, ceilHeight * 2 + disY + lineH, lineWidth / 2);
      this.cross(ceilWidth * i - disX - lineW, ceilHeight * 2 + disY, ceilWidth * i - disX, ceilHeight * 2 + disY, lineWidth / 2);    
      this.cross(ceilWidth * i - disX, ceilHeight * 2 + disY, ceilWidth * i - disX, ceilHeight * 2 + disY + lineH, lineWidth / 2);
    }
    // 上棋盘兵折线
    for(let i=0; i<=8; i+=2) {
      if(i !== 0){
        this.cross(ceilWidth * i - disX - lineW, ceilHeight * 3 - disY, ceilWidth * i - disX, ceilHeight * 3 - disY, this.state.lineWidth / 2);   
        this.cross(ceilWidth * i - disX, ceilHeight * 3 - disY, ceilWidth * i - disX, ceilHeight * 3 - disY - lineH, this.state.lineWidth / 2);
        this.cross(ceilWidth * i - disX - lineW, ceilHeight * 3 + disY, ceilWidth * i - disX, ceilHeight * 3 + disY, this.state.lineWidth / 2);    
        this.cross(ceilWidth * i - disX, ceilHeight * 3 + disY, ceilWidth * i - disX, ceilHeight * 3 + disY + lineH, this.state.lineWidth / 2);
      }
      if(i !== 8) {
        this.cross(ceilWidth * i + disX, ceilHeight * 3 - disY, ceilWidth * i + disX + lineW, ceilHeight * 3 - disY, this.state.lineWidth / 2);
        this.cross(ceilWidth * i + disX, ceilHeight * 3 - disY, ceilWidth * i + disX, ceilHeight * 3 - disY - lineH, this.state.lineWidth / 2);
        this.cross(ceilWidth * i + disX, ceilHeight * 3 + disY, ceilWidth * i + disX + lineW, ceilHeight * 3 + disY, this.state.lineWidth / 2);
        this.cross(ceilWidth * i + disX, ceilHeight * 3 + disY, ceilWidth * i + disX, ceilHeight * 3 + disY + lineH, this.state.lineWidth / 2);
      }
    }
    // 下棋盘炮折线
    for(let i=1; i<=7; i+=6){
      // 上棋盘左炮折线，按左上、右上、右下、左下的顺序
      this.cross(ceilWidth * i - disX - lineW, ceilHeight * 7 - disY, ceilWidth * i - disX, ceilHeight * 7 - disY, lineWidth / 2);    
      this.cross(ceilWidth * i - disX, ceilHeight * 7 - disY, ceilWidth * i - disX, ceilHeight * 7 - disY - lineH, lineWidth / 2);
      this.cross(ceilWidth * i + disX, ceilHeight * 7 - disY, ceilWidth * i + disX + lineW, ceilHeight * 7 - disY, lineWidth / 2);
      this.cross(ceilWidth * i + disX, ceilHeight * 7 - disY, ceilWidth * i + disX, ceilHeight * 7 - disY - lineH, lineWidth / 2);
      this.cross(ceilWidth * i + disX, ceilHeight * 7 + disY, ceilWidth * i + disX + lineW, ceilHeight * 7 + disY, lineWidth / 2);
      this.cross(ceilWidth * i + disX, ceilHeight * 7 + disY, ceilWidth * i + disX, ceilHeight * 7 + disY + lineH, lineWidth / 2);
      this.cross(ceilWidth * i - disX - lineW, ceilHeight * 7 + disY, ceilWidth * i - disX, ceilHeight * 7 + disY, lineWidth / 2);    
      this.cross(ceilWidth * i - disX, ceilHeight * 7 + disY, ceilWidth * i - disX, ceilHeight * 7 + disY + lineH, lineWidth / 2);
    }
    // 下棋盘兵折线
    for(let i=0; i<=8; i+=2){
      if(i !== 0){
        this.cross(ceilWidth * i - disX - lineW, ceilHeight * 6 - disY, ceilWidth * i - disX, ceilHeight * 6 - disY, lineWidth / 2);   
        this.cross(ceilWidth * i - disX, ceilHeight * 6 - disY, ceilWidth * i - disX, ceilHeight * 6 - disY - lineH, lineWidth / 2);
        this.cross(ceilWidth * i - disX - lineW, ceilHeight * 6 + disY, ceilWidth * i - disX, ceilHeight * 6 + disY, lineWidth / 2);    
        this.cross(ceilWidth * i - disX, ceilHeight * 6 + disY, ceilWidth * i - disX, ceilHeight * 6 + disY + lineH, lineWidth / 2);
      }
      if(i !== 8){
        this.cross(ceilWidth * i + disX, ceilHeight * 6 - disY, ceilWidth * i + disX + lineW, ceilHeight * 6 - disY, lineWidth / 2);
        this.cross(ceilWidth * i + disX, ceilHeight * 6 - disY, ceilWidth * i + disX, ceilHeight * 6 - disY - lineH, lineWidth / 2);
        this.cross(ceilWidth * i + disX, ceilHeight * 6 + disY, ceilWidth * i + disX + lineW, ceilHeight * 6 + disY, lineWidth / 2);
        this.cross(ceilWidth * i + disX, ceilHeight * 6 + disY, ceilWidth * i + disX, ceilHeight * 6 + disY + lineH, lineWidth / 2);
      }
    }
    // 楚河汉界
    const fontSize = parseInt(ceilHeight / 1.5);
    context.font = `${fontSize}px KaiTi`;
    context.fillStyle = checkBoardColor;
    context.fillText("楚河", ceilWidth * 0.8, ceilHeight * 5 + ceilHeight / 4);
    context.fillText("汉界", ceilWidth * 6.8, ceilHeight * 5 + ceilHeight / 4);
  }
  render() {
    return (
      <Fragment>
        <canvas ref={this.canvas}></canvas>
      </Fragment>
    );
  }
}

export default CheckBoard;