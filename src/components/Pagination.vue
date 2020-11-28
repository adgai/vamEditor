<template>
  <div class="pagination-container">
    <div class="pagination is-background">
      <span class="pagination-total">共{{ page.total }}条</span>

      <span class="el-pagination__sizes">
        <div class="el-select el-select--mini">
          <div class="el-input el-input--mini el-input--suffix" v-on:click="popOptionalPage($event)">
            <input type="text" readonly="readonly" autocomplete="off" placeholder="请选择" class="el-input__inner"
                   v-model="sizeDesc">
            <span class="el-input__suffix"><span class="el-input__suffix-inner">
              <i class="el-select__caret el-input__icon el-icon-arrow-up"
                 v-bind:class="{ 'is-reverse': isReverse }"></i>
            </span>
            </span>
          </div>

          <div class="el-select-dropdown el-popper" v-bind:style="popStyle">
            <div class="el-scrollbar" style="">
            <div class="el-select-dropdown__wrap el-scrollbar__wrap"
                 style="margin-bottom: -15px; margin-right: -15px;">
            <ul class="el-scrollbar__view el-select-dropdown__list">


              <li class="el-select-dropdown__item" v-for="(canPageSize ,index) in this.canPageSizeList" :index="index"
                  v-on:click="changePageSize(canPageSize)"
                  :key="index">
                <span>{{ canPageSize }}条/页</span>
              </li>

            </ul>
            </div>
              <div class="el-scrollbar__bar is-horizontal">
              <div class="el-scrollbar__thumb" style="transform: translateX(0%);">

              </div>
            </div>
              <div class="el-scrollbar__bar is-vertical"><div class="el-scrollbar__thumb"
                                                              style="transform: translateY(0%);"></div></div></div>

            <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
            </div>
        </div>
      </span>

      <button type="button" disabled="disabled" class="btn-prev">
        <i class="el-icon el-icon-arrow-left"></i></button>

      <ur class="pages">
        <li v-for="(pageNum,index) in page.navigatepageNums" :key="index" :index="index"
            v-on:click="changePageNum(pageNum)">
          {{ pageNum }}
        </li>
      </ur>

      <button type="button" class="btn-next"><i class="el-icon el-icon-arrow-right"></i></button>


      <span class="pagination-jump">
        前往
        <div class="jump-to">
          <input autocomplete="off" type="number" :max="page.maxPage" :min="page.minPage"
                 v-model="pageRequest.pageNum"/>
        </div>
        页
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      canPageSizeList: [10, 20, 30, 50],
      sizeDesc: '',
      pageRequest: {
        pageNum: 1,
        pageSize: 20
      },
      isReverse: false,
      popStyle: "display: none;"
    }

  },
  methods: {
    changePageSize(newPageSize) {
      console.log('旧：' + this.page.pageSize + '新：' + newPageSize)
      this.pageRequest.pageSize = newPageSize
      this.sizeDesc = newPageSize + '条/页'
    },
    changePageNum(newPage) {
      this.pageRequest.pageNum = Number(newPage)
      console.log('new page' + newPage)
    },
    popOptionalPage() {
      this.isReverse = !this.isReverse;
      const currentTarget = document.getElementsByClassName('pagination-container')[0];

      if (this.isReverse) {
        let offsetHeight = currentTarget.offsetTop;
        // let offsetLeft = currentTarget.offsetLeft;
        // let optionalPage = document.getElementsByClassName('el-select-dropdown')[0];
        let optionalPageHeight = 148;
        console.log(offsetHeight)
        if (offsetHeight > optionalPageHeight) {
          console.log(231312321)

          offsetHeight = offsetHeight - optionalPageHeight - 2
        }
        console.log(offsetHeight)

        offsetHeight = -150
        this.popStyle = 'min-width: 110px; transform-origin: center top; z-index: 2043; '
        this.popStyle = this.popStyle + 'top:' + offsetHeight + 'px;'
      } else {
        this.popStyle = ' display: none;'
      }


    }
  },
  watch: {
    pageRequest: {
      handler(newValue, oldValue) {
        console.log('obj更新了新值是' + newValue + ',旧值是' + oldValue)


        this.$emit('changePageRequest', this.pageRequest)
      },
      deep: true
    }
  }
}
</script>


<style scoped>

@import "../css/icon.css";

.is-reverse {
  transform: rotate(0deg) !important;
}

.el-icon-arrow-up {
  transform: rotate(180deg);
}

.popper__arrow:after {

  content: " ";

}

*, :after, :before {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

.el-popper {
  /*display: none;*/
}


.el-select-dropdown__wrap {
  position: relative;
  margin-bottom: -15px;
  margin-right: -15px;
  overflow: scroll;
  height: 100%;
}

.el-select-dropdown__list {
  list-style: none;
  margin: 0;
  padding: 6px 0;
}


.el-select-dropdown__item {
  cursor: pointer;
  font-size: 14px;
  line-height: 34px;
}

.el-scrollbar {
  overflow: hidden;
}

.el-select-dropdown {
  min-width: 110px;

  position: absolute;
  z-index: 1001;
  border: 1px solid #dfe4ed;
  border-radius: 4px;
  background-color: #fff;
  list-style: none;
}

.jump-to {
  display: inline-block;
}

.el-input__suffix {
  top: 0;
  right: 0;
}

.el-input__icon:before {

}

.el-input__icon {
  width: 25px;
}

.el-input__suffix {
  position: absolute;
}

.el-pagination .el-select .el-input {
  width: 100px;
  margin: 0 5px;
}

.el-select > .el-input {
  display: block;
}

.el-input--mini {
  font-size: 12px;
}

.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}

.el-pagination .el-select .el-input .el-input__inner {
  padding-right: 25px;
  border-radius: 3px;
}

.el-pagination__sizes .el-input .el-input__inner {
  font-size: 13px;
  padding-left: 8px;
}

.el-input--mini .el-input__inner {
  height: 28px;
  line-height: 28px;
}

.el-input--suffix .el-input__inner {
  padding-right: 30px;
}

.el-select .el-input__inner {
  cursor: pointer;
  padding-right: 35px;
}

.el-pagination .el-input__inner {
  text-align: center;
  -moz-appearance: textfield;
  line-height: normal;
}

.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}

button, input {
  overflow: visible;
}

.el-select {
  position: relative;
}


.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}

.btn-prev {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
  padding: 0;
  border: 0;
}

.btn-next {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
  padding: 0;
  border: 0;
}

.pages li {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;

  border-radius: 2px;

  height: 28px;
  line-height: 28px;
  display: inline-block;

  font-size: 13px;
  min-width: 30px;

  cursor: pointer;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}

.pagination-jump {
  display: flex;
}

.pages {
  /*display: flex;*/
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  list-style: none;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  padding: 0;
  margin: 0;

}

.pagination {
  display: flex;

  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;

}

.pagination button {
  display: inline-block;
  font-size: 13px;
  min-width: 30px;
  height: 28px;
  line-height: 28px;
}

.pagination span {
  display: inline-block;
  font-size: 13px;
  min-width: 30px;
  height: 28px;
  line-height: 28px;
}


.pagination-container {
  display: flex;

}

.el-input__icon:after {
  width: 6px;
  height: 6px;
  /*border-top: 1px solid #999;*/
  /*border-right: 1px solid #999;*/
  /*transform: rotate(45deg);*/
  /*position: absolute;*/
  /*right: 0px;*/
  position: absolute;
  top: 0;
  left: 75%;
  content: "";
  color: #458a14;
  /*background-color: #9e9e9e;*/
}

.el-icon-arrow-right:after {
  width: 6px;
  height: 6px;
  border-top: 1px solid #999;
  border-right: 1px solid #999;
  transform: rotate(45deg);
  position: absolute;
  right: 0px;
}

</style>
