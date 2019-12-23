module.exports = {
  "componentName": "Page",
  "id": "Block_970952",
  "rect": {
    "x": 0,
    "y": 0,
    "width": 342,
    "height": 534
  },
  "smart": {},
  "props": {
    "style": {
      "display": "flex",
      "flexDirection": "row",
      "justifyContent": "space-around",
      "alignItems": "flex-start",
      "height": "534px"
    },
    "className": "box"
  },
  "children": [{
    "componentName": "Div",
    "props": {
      "onClick": function handleClick(e) {
        window.open(this.item.url);
      }
    },
    "children": [{
      "componentName": "Div",
      "id": "Block_843895",
      "rect": {
        "x": 0,
        "y": 0,
        "width": 342,
        "height": 342
      },
      "smart": {},
      "props": {
        "style": {
          "display": "flex",
          "position": "relative",
          "alignItems": "flex-start",
          "flexDirection": "row",
          "opacity": "1.00",
          "width": "342px",
          "height": "342px"
        },
        "className": "bd"
      },
      "children": [{
        "componentName": "Image",
        "id": "Image_7",
        "rect": {
          "x": 0,
          "y": 0,
          "width": 342,
          "height": 342
        },
        "smart": {},
        "props": {
          "style": {
            "position": "absolute",
            "top": "0px",
            "left": "0px",
            "width": "342px",
            "height": "342px",
            "overflow": "hidden"
          },
          "src": "https://img.alicdn.com/tfs/TB1DDx_rQL0gK0jSZFxXXXWHVXa-684-684.png",
          "className": "layer"
        }
      }, {
        "componentName": "Image",
        "id": "Image_8",
        "rect": {
          "x": 0,
          "y": 0,
          "width": 342,
          "height": 342
        },
        "smart": {},
        "props": {
          "style": {
            "position": "absolute",
            "top": "0px",
            "left": "0px",
            "opacity": "1.00",
            "width": "342px",
            "height": "342px"
          },
          "src": "https://img.alicdn.com/tfs/TB10TB_rQL0gK0jSZFxXXXWHVXa-684-684.png",
          "className": "bg"
        }
      }, {
        "componentName": "Div",
        "id": "Shape_9",
        "rect": {
          "x": 18,
          "y": 18,
          "width": 122,
          "height": 30
        },
        "smart": {},
        "props": {
          "style": {
            "boxSizing": "border-box",
            "display": "flex",
            "position": "absolute",
            "top": "18px",
            "left": "18px",
            "alignItems": "center",
            "flexDirection": "row",
            "borderRadius": "15px",
            "backgroundColor": "rgba(0,0,0,0.40)",
            "paddingRight": "9px",
            "paddingLeft": "10px",
            "height": "30px"
          },
          "className": "wrap"
        },
        "children": [{
          "componentName": "Image",
          "id": "Image_11",
          "rect": {
            "x": 28,
            "y": 24,
            "width": 14,
            "height": 18
          },
          "smart": {},
          "props": {
            "style": {
              "opacity": "1.00",
              "width": "14px",
              "height": "18px"
            },
            "src": "https://img.alicdn.com/tfs/TB1UoB9rQL0gK0jSZFAXXcA9pXa-28-36.png",
            "className": "riverdinwei"
          }
        }, {
          "componentName": "Text",
          "id": "Text_10_0",
          "rect": {
            "x": 46,
            "y": 22,
            "width": 84,
            "height": 22
          },
          "smart": {},
          "props": {
            "style": {
              "marginLeft": "4px",
              "width": "84px",
              "height": "22px",
              "lineHeight": "22px",
              "whiteSpace": "nowrap",
              "color": "#ffffff",
              "fontSize": "18px",
              "fontWeight": 400
            },
            "text": "距离500m",
            "className": "distance"
          }
        }]
      }]
    }, {
      "componentName": "Div",
      "id": "Shape_5",
      "rect": {
        "x": 0,
        "y": 342,
        "width": 342,
        "height": 114
      },
      "smart": {},
      "props": {
        "style": {
          "display": "flex",
          "alignItems": "flex-start",
          "flexDirection": "row",
          "justifyContent": "center",
          "backgroundColor": "#ffffff",
          "width": "342px",
          "height": "114px"
        },
        "className": "main"
      },
      "children": [{
        "componentName": "Text",
        "id": "Text_6_0",
        "rect": {
          "x": 18,
          "y": 364,
          "width": 300,
          "height": 88
        },
        "smart": {},
        "props": {
          "style": {
            "marginTop": "22px",
            "width": "300px",
            "height": "88px",
            "overflow": "hidden",
            "textOverflow": "ellipsis",
            "lineHeight": "44px",
            "color": "#333333",
            "fontSize": "30px",
            "fontWeight": 400
          },
          "className": "title",
          "text": "{{this.item.title}}"
        }
      }]
    }, {
      "componentName": "Div",
      "id": "Shape_0",
      "rect": {
        "x": 0,
        "y": 456,
        "width": 342,
        "height": 78
      },
      "smart": {},
      "props": {
        "style": {
          "boxSizing": "border-box",
          "display": "flex",
          "alignItems": "center",
          "flexDirection": "row",
          "justifyContent": "space-between",
          "borderBottomLeftRadius": "12px",
          "borderBottomRightRadius": "12px",
          "backgroundColor": "#ffffff",
          "paddingRight": "17px",
          "paddingLeft": "18px",
          "width": "342px",
          "height": "78px",
          "overflow": "hidden"
        },
        "className": "ft"
      },
      "children": [{
        "componentName": "Div",
        "id": "Block_277147",
        "rect": {
          "x": 18,
          "y": 480,
          "width": 132,
          "height": 30
        },
        "smart": {},
        "props": {
          "style": {
            "display": "flex",
            "alignItems": "center",
            "flexDirection": "row",
            "height": "30px"
          },
          "className": "block"
        },
        "children": [{
          "componentName": "Image",
          "id": "Image_1",
          "rect": {
            "x": 18,
            "y": 480,
            "width": 30,
            "height": 30
          },
          "smart": {},
          "props": {
            "style": {
              "width": "30px",
              "height": "30px"
            },
            "className": "xianjin",
            "src": "{{this.item.user.userImage}}"
          }
        }, {
          "componentName": "Text",
          "id": "Text_2_0",
          "rect": {
            "x": 54,
            "y": 481,
            "width": 96,
            "height": 28
          },
          "smart": {},
          "props": {
            "style": {
              "marginLeft": "6px",
              "lineHeight": "28px",
              "whiteSpace": "nowrap",
              "color": "#666666",
              "fontSize": "24px",
              "fontWeight": 300
            },
            "className": "fashionHome",
            "text": "{{this.item.user.userName}}"
          }
        }]
      }, {
        "componentName": "Div",
        "id": "Block_725545",
        "rect": {
          "x": 261,
          "y": 480,
          "width": 63,
          "height": 30
        },
        "smart": {},
        "props": {
          "style": {
            "display": "flex",
            "alignItems": "center",
            "flexDirection": "row",
            "height": "30px"
          },
          "className": "group"
        },
        "children": [{
          "componentName": "Image",
          "id": "Image_4",
          "rect": {
            "x": 261,
            "y": 484,
            "width": 22,
            "height": 22
          },
          "smart": {},
          "props": {
            "style": {
              "width": "22px",
              "height": "22px"
            },
            "src": "https://img.alicdn.com/tfs/TB1pxuarHj1gK0jSZFuXXcrHpXa-46-44.png",
            "className": "favorite"
          }
        }, {
          "componentName": "Text",
          "id": "Text_3_0",
          "rect": {
            "x": 288,
            "y": 482,
            "width": 36,
            "height": 26
          },
          "smart": {},
          "props": {
            "style": {
              "marginLeft": "5px",
              "lineHeight": "26px",
              "whiteSpace": "nowrap",
              "color": "#999999",
              "fontSize": "22px",
              "fontWeight": 400
            },
            "className": "num",
            "text": "{{this.item.readCount}}"
          }
        }]
      }]
    }],
    "loop": [{
      "title": "小户型卫浴怎样才能装得高大上？",
      "coverImage": "https://img.alicdn.com/tfs/TB1Txq6o7T2gK0jSZFkXXcIQFXa-684-684.png",
      "readCount": 200,
      "user": {
        "userImage": "https://img.alicdn.com/tfs/TB1DWe6oYj1gK0jSZFOXXc7GpXa-60-60.png",
        "userName": "时尚家居"
      },
      "url": "https://www.imgcook.com"
    }, {
      "title": "拥有超多功能的40平米简约小公寓了解一下",
      "coverImage": "https://img.alicdn.com/tfs/TB1XRQTo7P2gK0jSZPxXXacQpXa-684-648.png",
      "readCount": 500,
      "user": {
        "userImage": "https://img.alicdn.com/tfs/TB1DWe6oYj1gK0jSZFOXXc7GpXa-60-60.png",
        "userName": "花花设计工作"
      },
      "url": "https://www.imgcook.com/docs"
    }]
  }],
  "fileName": "index",
  "lifeCycles": {
    "_constructor": function constructor(props, context) {
      console.log('constructor');
    },
    "getDerivedStateFromProps": function getDerivedStateFromProps(props, state) {
      console.log('getDerivedStateFromProps');
      console.log(props);
      console.log(state);
    }
  },
  "methods": {
    "isReadCountShow": function isReadCountShow(readCount) {
      return readCount > 300;
    }
  },
  "state": {
    "stateData": "test"
  },
  "dataSource": {
    "list": [{
      "id": "fetch_example",
      "isInit": true,
      "type": "fetch",
      "options": {
        "method": "GET",
        "params": {},
        "uri": "https://jsonplaceholder.typicode.com/todos/1"
      },
      "dataHandler": function dataHandler(data, error) {
        console.log(dataHandler);
        return data;
      }
    }],
    "dataHandler": function dataHandler(dataMap) {
      console.log('dataHandler 11');
      return dataMap;
    }
  }
}