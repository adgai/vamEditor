<template>

  <div class="adgainai-web-markdown-editor">
    <div class="edit-draft">
      <div class="markdown-editor">
        <header class="header editor-header">
          <div class="left-box">

          </div>
          <input maxlength="20" v-model="article.title" placeholder="请输入标题..." spellcheck="false"
                 class="title-input title-input"/>
          <div class="right-box">

            <button  v-on:click="save">主动保存</button>
          </div>

        </header>
        <div class="main">
          <div class="bytemd-body">

            <div class="bytemd-editor">
              <textarea ref="mycode" class="codesql"></textarea>
            </div>
            <div class="bytemd-preview">
              <div class="markdown-body" v-html="preview">

              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="editor-footer editor-footer">
            <button class="ctrl-btn shotcut-btn">
              <img src="https://s3.pstatp.com/toutiao/xitu_juejin_web_editor/img/md.555fde04.svg"/>
            </button>
            <button class="ctrl-btn upload-image-btn">

              <img src="https://s3.pstatp.com/toutiao/xitu_juejin_web_editor/img/img.8288be10.svg">

            </button>
            <a class="guide-link">
              让文章获得更多曝光
            </a>
            <button class="ctrl-btn toggle-layout-btn">
              <img src="https://s3.pstatp.com/toutiao/xitu_juejin_web_editor/img/extend.ec7370cb.svg">
            </button>
          </div>

          <input style="display: none"/>
          <div class="preview-footer">
            <div class="title">
              预览
            </div>
            <div class="word-count">
              100字
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";

import showdown from 'showdown'

// import '../js/showdown-plugins/showdown-prettify-for-wechat.js'
// import '../js/showdown-plugins/showdown-task-list.js'
// import '../js/showdown-plugins/showdown-section-divider.js'
// import '../js/showdown-plugins/showdown-emoji.js'
// import '../js/showdown-plugins/showdown-image-size.js'
// import '../js/showdown-plugins/showdown-rich.js'
//
// // 语法高亮
// import '../js/google-code-prettify/run_prettify.js'
import showdownHighlight from "showdown-highlight"
import 'highlight.js/styles/github.css'

let CodeMirror = require("codemirror/lib/codemirror");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/selection/active-line");
require("codemirror/mode/sql/sql");
require("codemirror/mode/markdown/markdown")
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/sql-hint");

export default {
  name: "Editor",
  data() {
    return {
      article: {
        id: 0,
        title: '',
        markdownContent: '',
        htmlContent: '',
        tags: ''
      },
      markDown: '',
      converter1: null,
      preview: ''
    }
  },
  mounted() {

    this.init()

    let mime = 'text/markdown'
    //let theme = 'ambiance'//设置主题，不设置的会使用默认主题
    let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
      mode: mime,//选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      lineWrapping: true,
      //theme: theme,
      // autofocus: true,
      extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
      hintOptions: {//自定义提示选项
        tables: {
          users: ['name', 'score', 'birthDate'],
          countries: ['name', 'population', 'size']
        }
      }
    })
    //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
    editor.on('cursorActivity', function () {
      editor.showHint()
    })


    editor.on('change', (rm) => this.onChange(rm))


  },
  methods: {

    onChange(rm) {
      let value = rm.getValue();
      // console.log(rs)
      console.log(value)
      let makeHtml = this.converter1.makeHtml(value);
      this.preview = makeHtml
      console.log(makeHtml)
      this.article.markdownContent = value
      this.article.htmlContent = makeHtml

    },
    initConverter() {
      let converter2 = new showdown.Converter({
        // extensions: ['prettify', 'tasklist', 'section-divider', 'emoji', 'rich'],
        extensions: [showdownHighlight],
        tables: true,
        simpleLineBreaks: true,
        strikethrough: true
      })
      return converter2
    },
    init() {
      this.converter1 = this.initConverter()
      console.log('转化器初始化完成')
    },

    save() {
      this.$http
          .post('/api/article/add', this.article)
          .then(res => {
            console.log(res)
            if (this.article.id){
              this.article.id = res
            }
            else {
              console.log(res)
            }
          })
    },
    refresh() {

    }

  }

}
</script>

<style>
.markdown-body {
  /*padding: 20px;*/
  word-break: break-word;
  line-height: 1.75;
  font-weight: 400;
  font-size: 15px;
  overflow-x: hidden;
  color: #333;
}

.bytemd-preview {
  text-align: left;
}

.cm-s-default .cm-header {
  color: #1ba2f0;
  font-weight: 400;
}

.CodeMirror-wrap pre {
  word-break: break-word;
}

.CodeMirror {
  height: 100%;
  font-family: Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace;
  font-size: 1.167rem;
  line-height: 1.7;
  text-align: left !important;
}

.bytemd-preview {
  border-left: 1px solid #ddd;
  background-color: white;
  margin-left: 50%;
  height: 100%;
  overflow: auto;
}

.bytemd-editor {
  float: left;
  width: 50%;
  overflow: hidden;
  height: 100%;
}

.bytemd-body {
  height: 100%;
  overflow: auto;
  flex: 1;
}

.title {
  cursor: default;
  user-select: none;
}

.toggle-layout-btn {
  margin: 0 0 0 auto;
}

.guide-link {
  margin-left: 1.25rem;
  font-size: 1rem;
  color: #b2bac1;
}

.upload-image-btn {
  margin-left: 1rem;
}

.ctrl-btn {
  outline: none;
  cursor: pointer;
  pointer-events: all;
  padding: .3rem;
  font-size: 0;
  background-color: transparent;
  border: none;
}

.shotcut-btn {
  position: relative;
}

.preview-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 .6rem;
  height: 3.6rem;
  font-size: 1.2rem;
  color: #ddd;
  background-color: white;
  border-top: 1px solid #ddd;
  z-index: 10;
  border-left: 1px solid #ddd;
}

.footer > div {
  flex: 1;

}

.editor-footer {
  display: flex;
  padding: 0 .6rem;
  height: 3.6rem;
  background-color: white;
  border-top: 1px solid #ddd;
  z-index: 10;
  user-select: none;
  align-items: center;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 5;
}

.main {
  display: flex;
  position: absolute;
  top: 5.334rem;
  left: 0;
  right: 0;
  bottom: 3.6rem;
  overflow: hidden;
}

.title-input {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 700;
  border: none;
  outline: none;
}

.title-input {
  flex: 1 1 auto;
  height: 100%;
}

.markdown-editor {
  background-color: #f8f9fa;
}

header {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 1.4rem;
  height: 5.334rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  z-index: 100;
}
</style>
