import React, { Component, Fragment } from 'react';

class CheckBoard extends Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.state = {
      canvasWidth: 0,
      canvasHeight: 0,
      ceilWidth: 0,
      ceilHeight: 0
    }
  }
  componentDidMount() {
    this.computedSize();
  }
  // 计算棋盘的宽高
  computedSize() {
    const canvas = this.canvas.current;
    // 获取浏览器可使用的宽高
    const browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // console.log(browserWidth, browserHeight);
    // 通过获取浏览器宽高中的较小值来设置棋盘大小
    let minLength = Math.min(browserWidth, browserHeight) * 0.9;
    canvas.height = Math.ceil(minLength);
    canvas.width = Math.ceil(minLength / 9 * 8);
    this.setState({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      ceilWidth: canvas.width / 9,
      ceilHeight: canvas.height / 10,
      lineWidth: minLength > 500 ? 3 : 1,
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
    const canvas = this.canvas.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(sx + this.state.ceilWidth / 2, sy + this.state.ceilHeight / 2);
    context.lineTo(ex + this.state.ceilWidth / 2, ey + this.state.ceilHeight / 2);
    context.strokeStyle =  "red";
    context.lineWidth = bw;
    context.stroke();
    context.closePath();
  }
  // 画棋盘
  drawCheckerboard() {
    const {ceilWidth, ceilHeight, lineWidth} = this.state;
    const canvas = this.canvas.current;
    const context = canvas.getContext("2d");
    // 外框
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.state.canvasWidth, 0);
    context.lineTo(this.state.canvasWidth, this.state.canvasHeight);
    context.lineTo(0, this.state.canvasHeight);	
    context.lineTo(0, 0);
    context.lineWidth = this.state.lineWidth * 2;
    context.strokeStyle = "red";
    context.stroke();
    context.closePath(); 
     // 横线
    for(let i=0; i<=9; i++) {
      this.cross(0, i * this.state.ceilHeight, this.state.ceilWidth * 8, i * this.state.ceilHeight, this.state.lineWidth);
    }
    // 竖线
    for(let i=0; i<=8; i++) {
      // 左右两条长竖线
      if(i === 0 || i === 8) {
        this.cross(i * this.state.ceilWidth, 0, i * this.state.ceilWidth, this.state.ceilHeight * 9, this.state.lineWidth);
      }
      else {
        // 上半棋盘的竖线
        this.cross(i * this.state.ceilWidth, 0, i * this.state.ceilWidth, 4 * this.state.ceilHeight, this.state.lineWidth);
        // 下半棋盘的竖线
        this.cross(i * this.state.ceilWidth, 5 * this.state.ceilHeight, i * this.state.ceilWidth, this.state.ceilHeight * 9, this.state.lineWidth);
      }
    }		
    // 上棋盘四宫格斜线
    this.cross(3 * this.state.ceilWidth, 0, 5 * this.state.ceilWidth, 2 * this.state.ceilHeight, this.state.lineWidth);
    this.cross(5 * this.state.ceilWidth, 0, 3 * this.state.ceilWidth, 2 * this.state.ceilHeight, this.state.lineWidth);
    // 下棋盘四宫格斜线
    this.cross(3 * this.state.ceilWidth, 7 * this.state.ceilHeight, 5 * this.state.ceilWidth, 9 * this.state.ceilHeight, this.state.lineWidth);
    this.cross(3 * this.state.ceilWidth, 9 * this.state.ceilHeight, 5 * this.state.ceilWidth, 7 * this.state.ceilHeight, this.state.lineWidth);
    let lineW = this.state.ceilWidth / 7;   // 折线的宽度
    let lineH = this.state.ceilHeight / 7;  // 折线的高度
    let disX = this.state.ceilWidth / 14;   // 折线距离边框的横向距离
    let disY = this.state.ceilHeight / 14;  // 折线距离边框的纵向距离
    // 上棋盘炮折线
    for(let i=1; i<=7; i+=6) {
      // 上棋盘左炮折线，按左上、右上、右下、左下的顺序
      this.cross(this.state.ceilWidth * i - disX - lineW, this.state.ceilHeight * 2 - disY, this.state.ceilWidth * i - disX, this.state.ceilHeight * 2 - disY, this.state.lineWidth / 2);    
      this.cross(this.state.ceilWidth * i - disX, this.state.ceilHeight * 2 - disY, this.state.ceilWidth * i - disX, this.state.ceilHeight * 2 - disY - lineH, this.state.lineWidth / 2);
      this.cross(this.state.ceilWidth * i + disX, this.state.ceilHeight * 2 - disY, this.state.ceilWidth * i + disX + lineW, this.state.ceilHeight * 2 - disY, this.state.lineWidth / 2);
      this.cross(this.state.ceilWidth * i + disX, this.state.ceilHeight * 2 - disY, this.state.ceilWidth * i + disX, this.state.ceilHeight * 2 - disY - lineH, this.state.lineWidth / 2);
      this.cross(this.state.ceilWidth * i + disX, this.state.ceilHeight * 2 + disY, this.state.ceilWidth * i + disX + lineW, this.state.ceilHeight * 2 + disY, this.state.lineWidth / 2);
      this.cross(this.state.ceilWidth * i + disX, this.state.ceilHeight * 2 + disY, this.state.ceilWidth * i + disX, this.state.ceilHeight * 2 + disY + lineH, this.state.lineWidth / 2);
      this.cross(this.state.ceilWidth * i - disX - lineW, this.state.ceilHeight * 2 + disY, this.state.ceilWidth * i - disX, this.state.ceilHeight * 2 + disY, this.state.lineWidth / 2);    
      this.cross(this.state.ceilWidth * i - disX, this.state.ceilHeight * 2 + disY, this.state.ceilWidth * i - disX, this.state.ceilHeight * 2 + disY + lineH, this.state.lineWidth / 2);
    }
    // 上棋盘兵折线
    // for(let i=0; i<=8; i + =2) {
    //   if(i !== 0){
    //     this.cross(ceilWidth * i - disX - lineW, ceilHeight * 3 - disY, ceilWidth * i - disX, ceilHeight * 3 - disY, this.state.lineWidth / 2);   
    //     this.cross(ceilWidth * i - disX, ceilHeight * 3 - disY, ceilWidth * i - disX, ceilHeight * 3 - disY - lineH, this.state.lineWidth / 2);
    //     this.cross(ceilWidth * i - disX - lineW, ceilHeight * 3 + disY, ceilWidth * i - disX, ceilHeight * 3 + disY, this.state.lineWidth / 2);    
    //     this.cross(ceilWidth * i - disX, ceilHeight * 3 + disY, ceilWidth * i - disX, ceilHeight * 3 + disY + lineH, this.state.lineWidth / 2);
    //   }
    //   if(i !== 8) {
    //     this.cross(ceilWidth * i + disX, ceilHeight * 3 - disY, ceilWidth * i + disX + lineW, ceilHeight * 3 - disY, this.state.lineWidth / 2);
    //     this.cross(ceilWidth * i + disX, ceilHeight * 3 - disY, ceilWidth * i + disX, ceilHeight * 3 - disY - lineH, this.state.lineWidth / 2);
    //     this.cross(ceilWidth * i + disX, ceilHeight * 3 + disY, ceilWidth * i + disX + lineW, ceilHeight * 3 + disY, this.state.lineWidth / 2);
    //     this.cross(ceilWidth * i + disX, ceilHeight * 3 + disY, ceilWidth * i + disX, ceilHeight * 3 + disY + lineH, this.state.lineWidth / 2);
    //   }
    // }
    // // 下棋盘炮折线
    // for(let i=1; i<=7; i+=6){
    //   this.cross(ceilWidth*i-disX-lineW, ceilHeight*7-disY, ceilWidth*i-disX, ceilHeight*7-disY, 1);    // 上棋盘左炮折线，按左上右上右下左下的顺序
    //   this.cross(ceilWidth*i-disX, ceilHeight*7-disY, ceilWidth*i-disX, ceilHeight*7-disY-lineH, 1);
    //   this.cross(ceilWidth*i+disX, ceilHeight*7-disY, ceilWidth*i+disX+lineW, ceilHeight*7-disY, 1);
    //   this.cross(ceilWidth*i+disX, ceilHeight*7-disY, ceilWidth*i+disX, ceilHeight*7-disY-lineH, 1);
    //   this.cross(ceilWidth*i+disX, ceilHeight*7+disY, ceilWidth*i+disX+lineW, ceilHeight*7+disY, 1);
    //   this.cross(ceilWidth*i+disX, ceilHeight*7+disY, ceilWidth*i+disX, ceilHeight*7+disY+lineH, 1);
    //   this.cross(ceilWidth*i-disX-lineW, ceilHeight*7+disY, ceilWidth*i-disX, ceilHeight*7+disY, 1);    
    //   this.cross(ceilWidth*i-disX, ceilHeight*7+disY, ceilWidth*i-disX, ceilHeight*7+disY+lineH, 1);
    // }
    // // 下棋盘兵折线
    // for(let i=0; i<=8; i+=2){
    //   if(i !== 0){
    //     this.cross(ceilWidth*i-disX-lineW, ceilHeight*6-disY, ceilWidth*i-disX, ceilHeight*6-disY, 1);   
    //     this.cross(ceilWidth*i-disX, ceilHeight*6-disY, ceilWidth*i-disX, ceilHeight*6-disY-lineH, 1);
    //     this.cross(ceilWidth*i-disX-lineW, ceilHeight*6+disY, ceilWidth*i-disX, ceilHeight*6+disY, 1);    
    //     this.cross(ceilWidth*i-disX, ceilHeight*6+disY, ceilWidth*i-disX, ceilHeight*6+disY+lineH, 1);
    //   }
    //   if(i !== 8){
    //     this.cross(ceilWidth*i+disX, ceilHeight*6-disY, ceilWidth*i+disX+lineW, ceilHeight*6-disY, 1);
    //     this.cross(ceilWidth*i+disX, ceilHeight*6-disY, ceilWidth*i+disX, ceilHeight*6-disY-lineH, 1);
    //     this.cross(ceilWidth*i+disX, ceilHeight*6+disY, ceilWidth*i+disX+lineW, ceilHeight*6+disY, 1);
    //     this.cross(ceilWidth*i+disX, ceilHeight*6+disY, ceilWidth*i+disX, ceilHeight*6+disY+lineH, 1);
    //   }
    // }
    // // 楚河汉界
    // let fontSize = ceilHeight / 1.5;
    // context.font = String(fontSize) + 'px' + " KaiTi";
    // context.fillStyle = "red";
    // context.fillText("楚河", ceilWidth*0.8, ceilHeight*5+paddingY/2);
    // context.fillText("汉界", ceilWidth*6.8, ceilHeight*5+paddingY/2);
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