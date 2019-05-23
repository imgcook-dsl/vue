# 模块还原 JSON

本篇文档介绍达芬奇中描述结构的数据协议，我们通过一个 JSON 来描述还原后的模块它的一些基本信息。<br />协议中的 JSON 在描述模块信息时可分为几个类型，常见的基础类型有文本类型、图像类型以及容器类型，<br />每种类型都有通用的字段来作描述（type/id/style/attrs），其中 style 代表样式，attrs 代表属性，type 代<br />表节点原始类型（可能有多个），由 type 可演变为 componentType 代表节点应用的实例类型（多对一）。

## 基础类型

### 文本

```json
{
  "__VERSION__": "2.0",
  "type": "Text",
  "componentType": "text",
  "id": "Text-7",
  "style": {
    "width": 94,
    "height": 20,
    "lineHeight": 20,
    "whiteSpace": "nowrap",
    "color": "#666666",
    "fontFamily": "PingFangSC",
    "fontSize": 20,
    "fontWeight": 400
  },
  "attrs": {
    "y": 42,
    "x": 380,
    "lines": 1,
    "text": "距离480m"
  }
}
```

### 图像

```json
{
  "id": "Image-8",
  "__VERSION__": "2.0",
  "type": "Image",
  "componentType": "picture",
  "children": [],
  "style": {
    "width": 15,
    "height": 20
  },
  "attrs": {
    "y": 42,
    "x": 360,
    "source": "https://img.alicdn.com/tfs/TB1gmFKDirpK1RjSZFhXXXSdXXa-32-40.png"
  }
}
```


### 容器

容器类型可由三类节点得来，type 分别为 `Block` 、 `Repeat` 、 `Shape` 。部分情况下会有个 `changeType` 字段代表转换后的类型，比如链接 link。

```json
{
  "attrs": {
    "x": 348,
    "y": 24
  },
  "style": {
    "display": "flex",
    "alignItems": "flex-start",
    "flexDirection": "column",
    "justifyContent": "center",
    "width": 380,
    "height": 302
  }
  "type": "Block",
  "componentType": "view",
  "changeType": "link",
  "id": "Block-638621",
  "__VERSION__": "2.0",
  "children": [{...}, {...}], // 可能含有其他类型的子节点
  "__ADAPT__": true
}
```

注：以上 JSON 为布局算法后生成的数据结构。


## 平台处理

需要注意的一点是，如果是在达芬奇平台编辑器上使用过后，模块数据在结构字段上会有一些增量的差异，这些差异主要服务于平台里后续的功能事项，如果接入方只使用布局生成后的结果，这段可略过。

- 类型转换：聚合基础类型 type 为更上层的组件类型 `componentType` ，增加 `link` 等可经转换后类型的 `changeType` 。


## 举例

### Sketch/PSD/图像导出的 JSON

```javascript
{
  "type": "Block",
  "id": "Block-1",
  "__VERSION__": "2.0",
  "props": {
    "style": {
      "width": 750,
      "height": 348
    },
    "attrs": {
      "x": 0,
      "y": 0
    }
  },
  "children": [
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 750,
          "height": 348,
          "backgroundColor": "rgba(255,255,255,1)",
          "borderTopLeftRadius": 0,
          "borderTopRightRadius": 0,
          "borderBottomRightRadius": 0,
          "borderBottomLeftRadius": 0
        },
        "attrs": {
          "x": 0,
          "y": 0
        }
      },
      "children": [],
      "type": "Shape",
      "id": "Shape-0"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 150,
          "height": 36,
          "backgroundColor": "rgba(255,244,192,1)",
          "borderTopLeftRadius": 19,
          "borderTopRightRadius": 19,
          "borderBottomRightRadius": 19,
          "borderBottomLeftRadius": 19
        },
        "attrs": {
          "x": 576,
          "y": 276
        }
      },
      "children": [],
      "type": "Shape",
      "id": "Shape-1"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 120,
          "height": 24,
          "fontFamily": "PingFangSC",
          "fontSize": "24",
          "color": "#FF9D00",
          "letterSpacing": "0",
          "textAlign": "right",
          "lineHeight": "24rem",
          "fontWeight": 400
        },
        "attrs": {
          "x": 588,
          "y": 282,
          "text": "＃中式家居",
          "lines": 1
        }
      },
      "type": "Text",
      "id": "Text-2"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 30,
          "height": 30
        },
        "attrs": {
          "x": 348,
          "y": 281,
          "source": "https://img.alicdn.com/tfs/TB19hNKDmzqK1RjSZFHXXb3CpXa-60-60.png"
        }
      },
      "children": [],
      "type": "Image",
      "id": "Image-3"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 96,
          "height": 33,
          "fontFamily": "PingFangSC",
          "fontSize": "24",
          "color": "#999999",
          "textAlign": "justify",
          "lineHeight": "33rem",
          "fontWeight": 400
        },
        "attrs": {
          "x": 388,
          "y": 278,
          "text": "顾家家居",
          "lines": 1
        }
      },
      "type": "Text",
      "id": "Text-4"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 300,
          "height": 30,
          "fontFamily": "PingFangSC",
          "fontSize": "30",
          "color": "#222222",
          "letterSpacing": "0",
          "lineHeight": "30rem",
          "fontWeight": 500
        },
        "attrs": {
          "x": 348,
          "y": 86,
          "text": "品味新中式的细致优雅",
          "lines": 1
        }
      },
      "type": "Text",
      "id": "Text-5"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 138,
          "height": 32,
          "opacity": 0.04,
          "backgroundColor": "rgba(0,0,0,1)",
          "borderTopLeftRadius": 16,
          "borderTopRightRadius": 16,
          "borderBottomRightRadius": 16,
          "borderBottomLeftRadius": 16
        },
        "attrs": {
          "x": 348,
          "y": 36
        }
      },
      "children": [],
      "type": "Shape",
      "id": "Shape-6"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 94,
          "height": 20,
          "fontFamily": "PingFangSC",
          "fontSize": "20",
          "color": "#666666",
          "letterSpacing": "0",
          "lineHeight": "20rem",
          "fontWeight": 400
        },
        "attrs": {
          "x": 380,
          "y": 42,
          "text": "距离480m",
          "lines": 1
        }
      },
      "type": "Text",
      "id": "Text-7"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 15,
          "height": 20
        },
        "attrs": {
          "x": 360,
          "y": 42,
          "source": "https://img.alicdn.com/tfs/TB1gmFKDirpK1RjSZFhXXXSdXXa-32-40.png"
        }
      },
      "children": [],
      "type": "Image",
      "id": "Image-8"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 372,
          "height": 80,
          "fontFamily": "PingFangSC",
          "fontSize": "26",
          "color": "#999999",
          "letterSpacing": "0",
          "lineHeight": "40rem",
          "fontWeight": 300
        },
        "attrs": {
          "x": 348,
          "y": 132,
          "text": "创意大理石纹陶瓷杯采用优质陶瓷高温烧制而成，瓷质细...",
          "lines": 2
        }
      },
      "type": "Text",
      "id": "Text-9"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 300,
          "height": 300,
          "overflow": "hidden"
        },
        "attrs": {
          "x": 24,
          "y": 24,
          "source": "https://img.alicdn.com/tfs/TB1U0JJDkvoK1RjSZPfXXXPKFXa-600-600.png"
        }
      },
      "children": [],
      "type": "Image",
      "id": "Image-10"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 68,
          "height": 72,
          "backgroundColor": "rgba(53,181,255,1)",
          "borderTopLeftRadius": 0,
          "borderTopRightRadius": 10,
          "borderBottomRightRadius": 10,
          "borderBottomLeftRadius": 0
        },
        "attrs": {
          "x": 0,
          "y": 44
        }
      },
      "children": [],
      "type": "Shape",
      "id": "Shape-11"
    },
    {
      "__VERSION__": "2.0",
      "props": {
        "style": {
          "width": 48,
          "height": 32,
          "fontFamily": "PingFangSC",
          "fontSize": "24",
          "color": "#FFFFFF",
          "letterSpacing": "0",
          "lineHeight": "32rem",
          "fontWeight": 500
        },
        "attrs": {
          "x": 10,
          "y": 64,
          "text": "知识",
          "lines": 1
        }
      },
      "type": "Text",
      "id": "Text-12"
    }
  ],
  "artboardImg": "https://img.alicdn.com/tfs/TB1qOXKDmzqK1RjSZFHXXb3CpXa-810-408.png",
  "name": "Group 11 Copy 45",
  "pluginVersion": "1.6.6"
}
```

<a name="wonlrp"></a>

### [](#wonlrp)布局算法后的 JSON

```javascript
{
  "id": "Shape-0",
  "__VERSION__": "2.0",
  "type": "Shape",
  "children": [
    {
      "props": {
        "attrs": {
          "x": 0,
          "y": 24,
          "fixed": true
        },
        "style": {
          "boxSizing": "border-box",
          "display": "flex",
          "position": "relative",
          "marginLeft": -24,
          "paddingLeft": 24,
          "width": 324,
          "height": 300
        }
      },
      "type": "Block",
      "id": "Block-506977",
      "__VERSION__": "2.0",
      "children": [
        {
          "id": "Image-10",
          "__VERSION__": "2.0",
          "type": "Image",
          "children": [],
          "props": {
            "style": {
              "width": 300,
              "height": 300
            },
            "attrs": {
              "y": 24,
              "x": 24,
              "source": "https://img.alicdn.com/tfs/TB1U0JJDkvoK1RjSZPfXXXPKFXa-600-600.png"
            }
          },
          "__ADAPT__": true
        },
        {
          "id": "Shape-11",
          "__VERSION__": "2.0",
          "type": "Shape",
          "children": [
            {
              "__VERSION__": "2.0",
              "type": "Text",
              "id": "Text-12",
              "props": {
                "style": {
                  "width": 48,
                  "height": 32,
                  "lineHeight": 32,
                  "whiteSpace": "nowrap",
                  "color": "#ffffff",
                  "fontFamily": "PingFangSC",
                  "fontSize": 24,
                  "fontWeight": 500
                },
                "attrs": {
                  "y": 64,
                  "x": 10,
                  "lines": 1,
                  "text": "知识"
                }
              }
            }
          ],
          "props": {
            "style": {
              "boxSizing": "border-box",
              "display": "flex",
              "position": "absolute",
              "top": 20,
              "left": 0,
              "alignItems": "center",
              "flexDirection": "row",
              "borderTopRightRadius": 10,
              "borderBottomRightRadius": 10,
              "backgroundColor": "#35b5ff",
              "paddingRight": 10,
              "paddingLeft": 10,
              "height": 72
            },
            "attrs": {
              "y": 44,
              "x": 0
            }
          },
          "__ADAPT__": true,
          "deleteStyle": {
            "maxWidth": 68
          }
        }
      ],
      "__ADAPT__": true
    },
    {
      "props": {
        "attrs": {
          "x": 348,
          "y": 24
        },
        "style": {
          "display": "flex",
          "alignItems": "flex-start",
          "flexDirection": "column",
          "justifyContent": "center",
          "width": 380,
          "height": 302
        }
      },
      "type": "Block",
      "id": "Block-638621",
      "__VERSION__": "2.0",
      "children": [
        {
          "id": "Shape-6",
          "__VERSION__": "2.0",
          "type": "Shape",
          "children": [
            {
              "id": "Image-8",
              "__VERSION__": "2.0",
              "type": "Image",
              "children": [],
              "props": {
                "style": {
                  "width": 15,
                  "height": 20
                },
                "attrs": {
                  "y": 42,
                  "x": 360,
                  "source": "https://img.alicdn.com/tfs/TB1gmFKDirpK1RjSZFhXXXSdXXa-32-40.png"
                }
              },
              "__ADAPT__": true
            },
            {
              "__VERSION__": "2.0",
              "type": "Text",
              "id": "Text-7",
              "props": {
                "style": {
                  "width": 94,
                  "height": 20,
                  "lineHeight": 20,
                  "whiteSpace": "nowrap",
                  "color": "#666666",
                  "fontFamily": "PingFangSC",
                  "fontSize": 20,
                  "fontWeight": 400
                },
                "attrs": {
                  "y": 42,
                  "x": 380,
                  "lines": 1,
                  "text": "距离480m"
                }
              },
              "__ADAPT__": true
            }
          ],
          "props": {
            "style": {
              "boxSizing": "border-box",
              "display": "flex",
              "alignItems": "center",
              "flexDirection": "row",
              "justifyContent": "space-between",
              "borderRadius": 16,
              "backgroundColor": "rgba(0,0,0,0.04)",
              "paddingRight": 11,
              "paddingLeft": 12,
              "width": 138,
              "height": 32
            },
            "attrs": {
              "y": 36,
              "x": 348
            }
          },
          "__ADAPT__": true
        },
        {
          "__VERSION__": "2.0",
          "type": "Text",
          "id": "Text-5",
          "props": {
            "style": {
              "marginTop": 18,
              "width": 300,
              "maxWidth": 368,
              "height": 30,
              "overflow": "hidden",
              "textOverflow": "ellipsis",
              "lineHeight": 30,
              "whiteSpace": "nowrap",
              "color": "#222222",
              "fontFamily": "PingFangSC",
              "fontSize": 30,
              "fontWeight": 500
            },
            "attrs": {
              "y": 86,
              "x": 348,
              "lines": 1,
              "text": "品味新中式的细致优雅",
              "fixed": true
            }
          },
          "__ADAPT__": true
        },
        {
          "__VERSION__": "2.0",
          "type": "Text",
          "id": "Text-9",
          "props": {
            "style": {
              "marginTop": 16,
              "width": 372,
              "height": 80,
              "overflow": "hidden",
              "textOverflow": "ellipsis",
              "lineHeight": 40,
              "color": "#999999",
              "fontFamily": "PingFangSC",
              "fontSize": 26,
              "fontWeight": 300
            },
            "attrs": {
              "y": 132,
              "x": 348,
              "lines": 2,
              "text": "创意大理石纹陶瓷杯采用优质陶瓷高温烧制而成，瓷质细..."
            }
          },
          "__ADAPT__": true
        },
        {
          "props": {
            "attrs": {
              "x": 348,
              "y": 276
            },
            "style": {
              "boxSizing": "border-box",
              "display": "flex",
              "flexDirection": "row",
              "justifyContent": "space-between",
              "marginTop": 64,
              "paddingRight": 2,
              "width": 380,
              "height": 38
            }
          },
          "type": "Block",
          "id": "Block-746332",
          "__VERSION__": "2.0",
          "__GRID__": "NEWROW",
          "children": [
            {
              "props": {
                "attrs": {
                  "x": 348,
                  "y": 276
                },
                "style": {
                  "display": "flex",
                  "flexDirection": "row",
                  "height": 37
                }
              },
              "type": "Block",
              "id": "Block-232018",
              "__VERSION__": "2.0",
              "children": [
                {
                  "id": "Image-3",
                  "__VERSION__": "2.0",
                  "type": "Image",
                  "children": [],
                  "props": {
                    "style": {
                      "marginTop": 5,
                      "width": 30,
                      "height": 30
                    },
                    "attrs": {
                      "y": 281,
                      "x": 348,
                      "source": "https://img.alicdn.com/tfs/TB19hNKDmzqK1RjSZFHXXb3CpXa-60-60.png"
                    }
                  },
                  "__ADAPT__": true
                },
                {
                  "__VERSION__": "2.0",
                  "type": "Text",
                  "id": "Text-4",
                  "props": {
                    "style": {
                      "marginTop": 2,
                      "marginLeft": 10,
                      "width": 96,
                      "height": 33,
                      "lineHeight": 33,
                      "whiteSpace": "nowrap",
                      "color": "#999999",
                      "fontFamily": "PingFangSC",
                      "fontSize": 24,
                      "fontWeight": 400
                    },
                    "attrs": {
                      "y": 278,
                      "x": 388,
                      "lines": 1,
                      "text": "顾家家居"
                    }
                  },
                  "__ADAPT__": true
                }
              ],
              "__ADAPT__": true
            },
            {
              "id": "Shape-1",
              "__VERSION__": "2.0",
              "type": "Shape",
              "children": [
                {
                  "__VERSION__": "2.0",
                  "type": "Text",
                  "id": "Text-2",
                  "props": {
                    "style": {
                      "width": 120,
                      "height": 24,
                      "lineHeight": 24,
                      "whiteSpace": "nowrap",
                      "color": "#ff9d00",
                      "fontFamily": "PingFangSC",
                      "fontSize": 24,
                      "fontWeight": 400
                    },
                    "attrs": {
                      "y": 282,
                      "x": 588,
                      "lines": 1,
                      "text": "＃中式家居"
                    }
                  }
                }
              ],
              "props": {
                "style": {
                  "boxSizing": "border-box",
                  "display": "flex",
                  "alignItems": "center",
                  "flexDirection": "row",
                  "borderRadius": 19,
                  "backgroundColor": "#fff4c0",
                  "paddingRight": 18,
                  "paddingLeft": 12,
                  "height": 36
                },
                "attrs": {
                  "y": 276,
                  "x": 576
                }
              },
              "__ADAPT__": true,
              "deleteStyle": {
                "maxWidth": 150
              }
            }
          ],
          "__ADAPT__": true
        }
      ],
      "__ADAPT__": true
    }
  ],
  "props": {
    "style": {
      "boxSizing": "border-box",
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "row",
      "justifyContent": "space-between",
      "backgroundColor": "#ffffff",
      "paddingRight": 22,
      "paddingLeft": 24,
      "width": 750,
      "height": 348
    },
    "attrs": {
      "y": 0,
      "x": 0
    }
  },
  "artboardImg": "https://img.alicdn.com/tfs/TB1qOXKDmzqK1RjSZFHXXb3CpXa-810-408.png",
  "name": "Group 11 Copy 45"
}
```

### 平台处理后

```
{
    "id": "Shape-0",
    "__VERSION__": "2.0",
    "type": "Shape",
    "children": [
        {
            "type": "Block",
            "id": "Block-950337",
            "__VERSION__": "2.0",
            "children": [
                {
                    "id": "Image-10",
                    "__VERSION__": "2.0",
                    "type": "Image",
                    "children": [],
                    "__ADAPT__": true,
                    "componentType": "picture",
                    "title": "Image",
                    "attrs": {
                        "y": 24,
                        "x": 24,
                        "source": "https://img.alicdn.com/tfs/TB1mfpaErrpK1RjSZTEXXcWAVXa-600-600.png",
                        "src": "https://img.alicdn.com/tfs/TB1mfpaErrpK1RjSZTEXXcWAVXa-600-600.png",
                        "className": "item"
                    },
                    "style": {
                        "width": 300,
                        "height": 300
                    },
                    "props": {},
                    "semantic": {
                        "dvc_default": [
                            {
                                "name": "dvc_default",
                                "level": 100,
                                "result": "pic",
                                "id": 512275
                            }
                        ],
                        "dvc_picture": [
                            {
                                "name": "dvc_picture",
                                "level": 55,
                                "result": "item",
                                "dataSuggest": {
                                    "source": "data",
                                    "sourceValue": "item_pic",
                                    "matchRule": "ITEM_PIC"
                                },
                                "id": 224187,
                                "choose": true
                            }
                        ]
                    }
                },
                {
                    "id": "Shape-11",
                    "__VERSION__": "2.0",
                    "type": "Shape",
                    "children": [
                        {
                            "__VERSION__": "2.0",
                            "type": "Text",
                            "id": "Text-12",
                            "componentType": "text",
                            "innerText": "知识",
                            "title": "Text",
                            "attrs": {
                                "y": 64,
                                "x": 10,
                                "lines": 1,
                                "text": "知识",
                                "fixed": true,
                                "className": "tag"
                            },
                            "style": {
                                "marginLeft": 10,
                                "maxWidth": 48,
                                "overflow": "hidden",
                                "textOverflow": "ellipsis",
                                "lineHeight": "32px",
                                "whiteSpace": "nowrap",
                                "color": "#ffffff",
                                "fontFamily": "PingFangSC",
                                "fontSize": 24,
                                "fontWeight": 500
                            },
                            "props": {},
                            "semantic": {
                                "dvc_default": [
                                    {
                                        "name": "dvc_default",
                                        "level": 100,
                                        "result": "text",
                                        "id": 865469
                                    }
                                ],
                                "dvc_text": [
                                    {
                                        "name": "dvc_text",
                                        "level": 65,
                                        "result": "tag",
                                        "id": 650313,
                                        "choose": true
                                    }
                                ]
                            }
                        }
                    ],
                    "__ADAPT__": true,
                    "componentType": "view",
                    "title": "Shape",
                    "attrs": {
                        "y": 44,
                        "x": 0,
                        "className": "tagWrap"
                    },
                    "style": {
                        "display": "flex",
                        "position": "absolute",
                        "top": 20,
                        "left": 0,
                        "alignItems": "center",
                        "flexDirection": "row",
                        "borderTopRightRadius": 10,
                        "borderBottomRightRadius": 10,
                        "backgroundColor": "#35b5ff",
                        "width": 68,
                        "height": 72
                    },
                    "props": {},
                    "semantic": {
                        "dvc_default": [
                            {
                                "name": "dvc_default",
                                "level": 100,
                                "result": "view",
                                "id": 659395
                            }
                        ],
                        "dvc_view": [
                            {
                                "name": "dvc_view",
                                "level": 95,
                                "result": "outer",
                                "id": 163541
                            }
                        ],
                        "dvc_text": [
                            {
                                "name": "dvc_text",
                                "level": 65,
                                "result": "tagWrap",
                                "id": 504130,
                                "choose": true
                            }
                        ]
                    }
                }
            ],
            "__ADAPT__": true,
            "componentType": "view",
            "title": "Block",
            "attrs": {
                "x": 0,
                "y": 24,
                "fixed": true,
                "className": "primary"
            },
            "style": {
                "boxSizing": "border-box",
                "display": "flex",
                "position": "relative",
                "marginLeft": -24,
                "paddingLeft": 24,
                "width": 324,
                "height": 300
            },
            "props": {},
            "semantic": {
                "dvc_layout": [
                    {
                        "name": "dvc_layout",
                        "level": 100,
                        "result": "primary",
                        "id": 732085,
                        "choose": true
                    }
                ],
                "dvc_default": [
                    {
                        "name": "dvc_default",
                        "level": 100,
                        "result": "view",
                        "id": 597641
                    }
                ],
                "dvc_view": [
                    {
                        "name": "dvc_view",
                        "level": 95,
                        "result": "container",
                        "id": 913559
                    }
                ],
                "dvc_picture": [
                    {
                        "name": "dvc_picture",
                        "level": 55,
                        "result": "itemWrap",
                        "id": 603613
                    }
                ]
            }
        },
        {
            "type": "Block",
            "id": "Block-773202",
            "__VERSION__": "2.0",
            "children": [
                {
                    "id": "Shape-6",
                    "__VERSION__": "2.0",
                    "type": "Shape",
                    "children": [
                        {
                            "id": "Image-8",
                            "__VERSION__": "2.0",
                            "type": "Image",
                            "children": [],
                            "__ADAPT__": true,
                            "componentType": "picture",
                            "title": "Image",
                            "attrs": {
                                "y": 42,
                                "x": 360,
                                "source": "https://img.alicdn.com/tfs/TB19lhgEAzoK1RjSZFlXXai4VXa-32-40.png",
                                "src": "https://img.alicdn.com/tfs/TB19lhgEAzoK1RjSZFlXXai4VXa-32-40.png",
                                "className": "icon"
                            },
                            "style": {
                                "marginTop": 6,
                                "width": 15,
                                "height": 20
                            },
                            "props": {},
                            "semantic": {
                                "dvc_default": [
                                    {
                                        "name": "dvc_default",
                                        "level": 100,
                                        "result": "img",
                                        "id": 81328
                                    }
                                ],
                                "dvc_picture": [
                                    {
                                        "name": "dvc_picture",
                                        "level": 60,
                                        "result": "icon",
                                        "id": 412027,
                                        "choose": true
                                    }
                                ]
                            }
                        },
                        {
                            "__VERSION__": "2.0",
                            "type": "Text",
                            "id": "Text-7",
                            "__ADAPT__": true,
                            "componentType": "text",
                            "innerText": "距离480m",
                            "title": "Text",
                            "attrs": {
                                "y": 42,
                                "x": 380,
                                "lines": 1,
                                "text": "距离480m",
                                "className": "distance"
                            },
                            "style": {
                                "marginTop": 6,
                                "lineHeight": "20px",
                                "whiteSpace": "nowrap",
                                "color": "#666666",
                                "fontFamily": "PingFangSC",
                                "fontSize": 20,
                                "fontWeight": 400
                            },
                            "props": {},
                            "semantic": {
                                "dvc_default": [
                                    {
                                        "name": "dvc_default",
                                        "level": 100,
                                        "result": "txt",
                                        "id": 460303
                                    }
                                ],
                                "dvc_text": [
                                    {
                                        "name": "dvc_text",
                                        "level": 55,
                                        "result": "distance",
                                        "id": 804735,
                                        "choose": true
                                    }
                                ]
                            }
                        }
                    ],
                    "__ADAPT__": true,
                    "componentType": "view",
                    "title": "Shape",
                    "attrs": {
                        "y": 36,
                        "x": 348,
                        "className": "block"
                    },
                    "style": {
                        "boxSizing": "border-box",
                        "display": "flex",
                        "alignItems": "flex-start",
                        "flexDirection": "row",
                        "justifyContent": "space-between",
                        "marginTop": 12,
                        "borderRadius": 16,
                        "backgroundColor": "rgba(0,0,0,0.04)",
                        "paddingRight": 11,
                        "paddingLeft": 12,
                        "width": 138,
                        "height": 32
                    },
                    "props": {},
                    "semantic": {
                        "dvc_default": [
                            {
                                "name": "dvc_default",
                                "level": 100,
                                "result": "block",
                                "id": 802570
                            }
                        ],
                        "dvc_view": [
                            {
                                "name": "dvc_view",
                                "level": 95,
                                "result": "block",
                                "id": 378898,
                                "choose": true
                            }
                        ]
                    }
                },
                {
                    "__VERSION__": "2.0",
                    "type": "Text",
                    "id": "Text-5",
                    "__ADAPT__": true,
                    "componentType": "text",
                    "innerText": "品味新中式的细致优雅",
                    "title": "Text",
                    "attrs": {
                        "y": 86,
                        "x": 348,
                        "lines": 1,
                        "text": "品味新中式的细致优雅",
                        "fixed": true,
                        "className": "title"
                    },
                    "style": {
                        "marginTop": 18,
                        "maxWidth": 368,
                        "overflow": "hidden",
                        "textOverflow": "ellipsis",
                        "lineHeight": "30px",
                        "whiteSpace": "nowrap",
                        "color": "#222222",
                        "fontFamily": "PingFangSC",
                        "fontSize": 30,
                        "fontWeight": 500
                    },
                    "props": {},
                    "semantic": {
                        "dvc_default": [
                            {
                                "name": "dvc_default",
                                "level": 100,
                                "result": "txt",
                                "id": 883573
                            }
                        ],
                        "dvc_text": [
                            {
                                "name": "dvc_text",
                                "level": 20,
                                "result": "title",
                                "id": 384558,
                                "choose": true
                            }
                        ]
                    }
                },
                {
                    "__VERSION__": "2.0",
                    "type": "Text",
                    "id": "Text-9",
                    "__ADAPT__": true,
                    "componentType": "text",
                    "innerText": "创意大理石纹陶瓷杯采用优质陶瓷高温烧制而成，瓷质细...",
                    "title": "Text",
                    "attrs": {
                        "y": 132,
                        "x": 348,
                        "lines": 2,
                        "text": "创意大理石纹陶瓷杯采用优质陶瓷高温烧制而成，瓷质细...",
                        "className": "summary"
                    },
                    "style": {
                        "marginTop": 16,
                        "width": 372,
                        "height": 80,
                        "overflow": "hidden",
                        "textOverflow": "ellipsis",
                        "lineHeight": "40px",
                        "color": "#999999",
                        "fontFamily": "PingFangSC",
                        "fontSize": 26,
                        "fontWeight": 300
                    },
                    "props": {},
                    "semantic": {
                        "dvc_default": [
                            {
                                "name": "dvc_default",
                                "level": 100,
                                "result": "word",
                                "id": 865576
                            }
                        ],
                        "dvc_text": [
                            {
                                "name": "dvc_text",
                                "level": 20,
                                "result": "summary",
                                "id": 359782,
                                "choose": true
                            }
                        ]
                    }
                },
                {
                    "type": "Block",
                    "id": "Block-133526",
                    "__VERSION__": "2.0",
                    "__GRID__": "NEWROW",
                    "children": [
                        {
                            "type": "Block",
                            "id": "Block-170438",
                            "__VERSION__": "2.0",
                            "children": [
                                {
                                    "id": "Image-3",
                                    "__VERSION__": "2.0",
                                    "type": "Image",
                                    "children": [],
                                    "__ADAPT__": true,
                                    "componentType": "picture",
                                    "title": "Image",
                                    "attrs": {
                                        "y": 281,
                                        "x": 348,
                                        "source": "https://img.alicdn.com/tfs/TB1JHc7ElLoK1RjSZFuXXXn0XXa-60-60.png",
                                        "src": "https://img.alicdn.com/tfs/TB1JHc7ElLoK1RjSZFuXXXn0XXa-60-60.png",
                                        "className": "avator"
                                    },
                                    "style": {
                                        "marginTop": 5,
                                        "width": 30,
                                        "height": 30
                                    },
                                    "props": {},
                                    "semantic": {
                                        "dvc_default": [
                                            {
                                                "name": "dvc_default",
                                                "level": 100,
                                                "result": "image",
                                                "id": 998954
                                            }
                                        ],
                                        "dvc_picture": [
                                            {
                                                "name": "dvc_picture",
                                                "level": 40,
                                                "result": "avator",
                                                "id": 39508,
                                                "choose": true
                                            }
                                        ]
                                    }
                                },
                                {
                                    "__VERSION__": "2.0",
                                    "type": "Text",
                                    "id": "Text-4",
                                    "__ADAPT__": true,
                                    "componentType": "text",
                                    "innerText": "顾家家居",
                                    "title": "Text",
                                    "attrs": {
                                        "y": 278,
                                        "x": 388,
                                        "lines": 1,
                                        "text": "顾家家居",
                                        "className": "brand"
                                    },
                                    "style": {
                                        "marginTop": 2,
                                        "marginLeft": 10,
                                        "lineHeight": "33px",
                                        "whiteSpace": "nowrap",
                                        "color": "#999999",
                                        "fontFamily": "PingFangSC",
                                        "fontSize": 24,
                                        "fontWeight": 400
                                    },
                                    "props": {},
                                    "semantic": {
                                        "dvc_default": [
                                            {
                                                "name": "dvc_default",
                                                "level": 100,
                                                "result": "word",
                                                "id": 536357
                                            }
                                        ],
                                        "dvc_text": [
                                            {
                                                "name": "dvc_text",
                                                "level": 45,
                                                "result": "brand",
                                                "id": 459231,
                                                "choose": true
                                            }
                                        ]
                                    }
                                }
                            ],
                            "__ADAPT__": true,
                            "componentType": "view",
                            "title": "Block",
                            "attrs": {
                                "x": 348,
                                "y": 276,
                                "className": "brandWrap"
                            },
                            "style": {
                                "display": "flex",
                                "flexDirection": "row",
                                "height": 37
                            },
                            "props": {},
                            "semantic": {
                                "dvc_default": [
                                    {
                                        "name": "dvc_default",
                                        "level": 100,
                                        "result": "block",
                                        "id": 365285
                                    }
                                ],
                                "dvc_view": [
                                    {
                                        "name": "dvc_view",
                                        "level": 95,
                                        "result": "wrap",
                                        "id": 518477
                                    }
                                ],
                                "dvc_text": [
                                    {
                                        "name": "dvc_text",
                                        "level": 45,
                                        "result": "brandWrap",
                                        "id": 78558,
                                        "choose": true
                                    }
                                ]
                            }
                        },
                        {
                            "id": "Shape-1",
                            "__VERSION__": "2.0",
                            "type": "Shape",
                            "children": [
                                {
                                    "__VERSION__": "2.0",
                                    "type": "Text",
                                    "id": "Text-2",
                                    "componentType": "text",
                                    "innerText": "＃中式家居",
                                    "title": "Text",
                                    "attrs": {
                                        "y": 282,
                                        "x": 588,
                                        "lines": 1,
                                        "text": "＃中式家居",
                                        "className": "tag2"
                                    },
                                    "style": {
                                        "marginTop": 6,
                                        "lineHeight": "24px",
                                        "whiteSpace": "nowrap",
                                        "color": "#ff9d00",
                                        "fontFamily": "PingFangSC",
                                        "fontSize": 24,
                                        "fontWeight": 400
                                    },
                                    "props": {},
                                    "semantic": {
                                        "dvc_default": [
                                            {
                                                "name": "dvc_default",
                                                "level": 100,
                                                "result": "text",
                                                "id": 104509
                                            }
                                        ],
                                        "dvc_text": [
                                            {
                                                "name": "dvc_text",
                                                "level": 65,
                                                "result": "tag",
                                                "id": 833335,
                                                "choose": true
                                            }
                                        ]
                                    }
                                }
                            ],
                            "__ADAPT__": true,
                            "deleteStyle": {
                                "maxWidth": 150
                            },
                            "componentType": "view",
                            "title": "Shape",
                            "attrs": {
                                "y": 276,
                                "x": 576,
                                "className": "tagWrap2"
                            },
                            "style": {
                                "boxSizing": "border-box",
                                "display": "flex",
                                "alignItems": "flex-start",
                                "flexDirection": "row",
                                "borderRadius": 19,
                                "backgroundColor": "#fff4c0",
                                "paddingRight": 18,
                                "paddingLeft": 12,
                                "height": 36
                            },
                            "props": {},
                            "semantic": {
                                "dvc_default": [
                                    {
                                        "name": "dvc_default",
                                        "level": 100,
                                        "result": "view",
                                        "id": 265187
                                    }
                                ],
                                "dvc_view": [
                                    {
                                        "name": "dvc_view",
                                        "level": 95,
                                        "result": "block",
                                        "id": 41878
                                    }
                                ],
                                "dvc_text": [
                                    {
                                        "name": "dvc_text",
                                        "level": 65,
                                        "result": "tagWrap",
                                        "id": 869508,
                                        "choose": true
                                    }
                                ]
                            }
                        }
                    ],
                    "__ADAPT__": true,
                    "componentType": "view",
                    "title": "Block",
                    "attrs": {
                        "x": 348,
                        "y": 276,
                        "className": "group"
                    },
                    "style": {
                        "boxSizing": "border-box",
                        "display": "flex",
                        "flexDirection": "row",
                        "justifyContent": "space-between",
                        "marginTop": 64,
                        "paddingRight": 2,
                        "width": 380,
                        "height": 38
                    },
                    "props": {},
                    "semantic": {
                        "dvc_default": [
                            {
                                "name": "dvc_default",
                                "level": 100,
                                "result": "view",
                                "id": 746898
                            }
                        ],
                        "dvc_view": [
                            {
                                "name": "dvc_view",
                                "level": 95,
                                "result": "group",
                                "id": 626166,
                                "choose": true
                            }
                        ]
                    }
                }
            ],
            "__ADAPT__": true,
            "componentType": "view",
            "title": "Block",
            "attrs": {
                "x": 348,
                "y": 24,
                "className": "side"
            },
            "style": {
                "display": "flex",
                "alignItems": "flex-start",
                "flexDirection": "column",
                "width": 380,
                "height": 302
            },
            "props": {},
            "semantic": {
                "dvc_layout": [
                    {
                        "name": "dvc_layout",
                        "level": 100,
                        "result": "side",
                        "id": 131059,
                        "choose": true
                    }
                ],
                "dvc_default": [
                    {
                        "name": "dvc_default",
                        "level": 100,
                        "result": "block",
                        "id": 910564
                    }
                ],
                "dvc_view": [
                    {
                        "name": "dvc_view",
                        "level": 95,
                        "result": "block",
                        "id": 560817
                    }
                ]
            }
        }
    ],
    "artboardImg": "https://img.alicdn.com/tfs/TB12pc7EgDqK1RjSZSyXXaxEVXa-810-408.png",
    "name": "Group 11 Copy 45",
    "componentType": "view",
    "title": "Shape",
    "attrs": {
        "y": 0,
        "x": 0,
        "className": "box"
    },
    "style": {
        "boxSizing": "border-box",
        "display": "flex",
        "alignItems": "center",
        "flexDirection": "row",
        "justifyContent": "space-between",
        "backgroundColor": "#ffffff",
        "paddingRight": 22,
        "paddingLeft": 24,
        "width": 750,
        "height": 348
    },
    "props": {},
    "semantic": {
        "dvc_default": [
            {
                "name": "dvc_default",
                "level": 100,
                "result": "block",
                "id": 636927
            }
        ],
        "dvc_layout": [
            {
                "name": "dvc_layout",
                "level": 100,
                "result": "box",
                "id": 925456,
                "choose": true
            }
        ]
    },
    "dataConfig": {
        "customerAttrs": {},
        "dynamicOrigin": [
            {
                "name": "data",
                "origin": {
                    "type": "expression",
                    "expression": "let data = this.props && this.props.data;"
                },
                "merge": [
                    {
                        "type": "schemaApp",
                        "appId": "dvc-7565"
                    }
                ]
            },
            {
                "name": "attrs",
                "origin": {
                    "type": "expression",
                    "expression": "let attrs = this.props && this.props.attrs;"
                },
                "merge": [
                    {
                        "type": "schemaApp",
                        "appId": "dvc-7565"
                    }
                ]
            },
            {
                "name": "pageInfo",
                "origin": {
                    "type": "expression",
                    "expression": "let pageInfo = this.props && this.props.pageInfo;"
                },
                "merge": []
            }
        ]
    },
    "dataBindingStore": [
        {
            "value": {
                "isStatic": false,
                "isHandEdit": true,
                "source": "data",
                "sourceValue": "item_pic",
                "helperScriptName": null
            },
            "smart": {
                "rule": "ITEM_PIC",
                "type": "dynamic"
            },
            "schema": {
                "schemaProps": {
                    "description": "dvc schema描述",
                    "properties": {
                        "item_pic": {
                            "title": "item_pic",
                            "type": "string"
                        }
                    },
                    "type": "object"
                }
            },
            "belongId": "Image-10",
            "defaultValue": "https://img.alicdn.com/tfs/TB1mfpaErrpK1RjSZTEXXcWAVXa-600-600.png",
            "target": [
                "source"
            ]
        },
        {
            "belongId": "Text-12",
            "target": [
                "innerText"
            ],
            "value": {
                "isStatic": true,
                "staticType": "STRING",
                "value": "知识"
            },
            "defaultValue": "知识",
            "smart": {
                "type": "dynamic",
                "rule": "default"
            }
        },
        {
            "belongId": "Image-8",
            "target": [
                "source"
            ],
            "value": {
                "isStatic": true,
                "staticType": "STRING",
                "value": "https://img.alicdn.com/tfs/TB19lhgEAzoK1RjSZFlXXai4VXa-32-40.png"
            },
            "defaultValue": "https://img.alicdn.com/tfs/TB19lhgEAzoK1RjSZFlXXai4VXa-32-40.png",
            "smart": {
                "type": "dynamic",
                "rule": "default"
            }
        },
        {
            "belongId": "Text-7",
            "target": [
                "innerText"
            ],
            "value": {
                "isStatic": true,
                "staticType": "STRING",
                "value": "距离480m"
            },
            "defaultValue": "距离480m",
            "smart": {
                "type": "dynamic",
                "rule": "default"
            }
        },
        {
            "belongId": "Text-5",
            "target": [
                "innerText"
            ],
            "value": {
                "isStatic": true,
                "staticType": "STRING",
                "value": "品味新中式的细致优雅"
            },
            "defaultValue": "品味新中式的细致优雅",
            "smart": {
                "type": "dynamic",
                "rule": "default"
            }
        },
        {
            "belongId": "Text-9",
            "target": [
                "innerText"
            ],
            "value": {
                "isStatic": true,
                "staticType": "STRING",
                "value": "创意大理石纹陶瓷杯采用优质陶瓷高温烧制而成，瓷质细..."
            },
            "defaultValue": "创意大理石纹陶瓷杯采用优质陶瓷高温烧制而成，瓷质细...",
            "smart": {
                "type": "dynamic",
                "rule": "default"
            }
        },
        {
            "belongId": "Image-3",
            "target": [
                "source"
            ],
            "value": {
                "isStatic": true,
                "staticType": "STRING",
                "value": "https://img.alicdn.com/tfs/TB1JHc7ElLoK1RjSZFuXXXn0XXa-60-60.png"
            },
            "defaultValue": "https://img.alicdn.com/tfs/TB1JHc7ElLoK1RjSZFuXXXn0XXa-60-60.png",
            "smart": {
                "type": "dynamic",
                "rule": "default"
            }
        },
        {
            "belongId": "Text-4",
            "target": [
                "innerText"
            ],
            "value": {
                "isStatic": true,
                "staticType": "STRING",
                "value": "顾家家居"
            },
            "defaultValue": "顾家家居",
            "smart": {
                "type": "dynamic",
                "rule": "default"
            }
        },
        {
            "belongId": "Text-2",
            "target": [
                "innerText"
            ],
            "value": {
                "isStatic": true,
                "staticType": "STRING",
                "value": "＃中式家居"
            },
            "defaultValue": "＃中式家居",
            "smart": {
                "type": "dynamic",
                "rule": "default"
            }
        }
    ],
    "rootProps": {
        "JSONSchema": {
            "title": "根节点属性",
            "description": "不同营销场景下配置不同，这里配置的是淘宝命运石RAX链路下的模块根节点属性",
            "type": "object",
            "required": [
                "gSize",
                "marginRight",
                "marginTop"
            ],
            "properties": {
                "gSize": {
                    "type": "integer",
                    "title": "一行几个",
                    "default": 2
                },
                "marginRight": {
                    "type": "integer",
                    "title": "模块横向间距",
                    "default": 24
                },
                "marginTop": {
                    "type": "integer",
                    "title": "模块纵向间距",
                    "default": 24
                },
                "backup": {
                    "type": "boolean",
                    "title": "启用空坑处理",
                    "default": true
                },
                "tracker": {
                    "type": "boolean",
                    "title": "启用埋点",
                    "default": false
                }
            }
        },
        "UISchema": {
            "gSize": {
                "ui:title": "一行几个"
            },
            "marginRight": {
                "ui:title": "模块横向间距"
            },
            "marginTop": {
                "ui:title": "模块纵向间距"
            },
            "backup": {
                "ui:widget": "switch",
                "ui:title": "启用空坑处理"
            },
            "tracker": {
                "ui:widget": "switch",
                "ui:title": "启用埋点"
            }
        },
        "formData": {
            "gSize": 2,
            "marginRight": 24,
            "marginTop": 24,
            "backup": true,
            "tracker": false
        }
    },
    "modStyleConfig": {
        "designWidth": 750,
        "designHeight": 1334
    }
}
```
