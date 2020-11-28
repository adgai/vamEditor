<template>
  <div class="editor-admin">
    <div class="article-list-box">
      <table>
        <tr>
          <th>
            id
          </th>
          <th>
            date
          </th>
          <th>
            author
          </th>

          <th>
            fire
          </th>

          <th>
            title
          </th>

          <th>
            deleted
          </th>

          <th>
            published
          </th>

        </tr>

        <colgroup>
          <col name="el-table_1_column_1" width="80">
          <col name="el-table_1_column_2" width="180">
          <col name="el-table_1_column_3" width="120">
          <col name="el-table_1_column_4" width="100">
          <col name="el-table_1_column_5" width="376">
          <col name="el-table_1_column_6" width="120">
          <col name="el-table_1_column_7" width="120">
        </colgroup>
        <tbody>
        <tr v-for="(article,index) in articleList" :key="article.id" :index="index">
          <td class="el-table_1_column_1">
            <div class="cell">
              {{ article.id }}
            </div>

          </td>
          <td class="el-table_1_column_2">
            <div class="cell">
              {{ article.title }}
            </div>

          </td>
          <td class="el-table_1_column_3">
            <div class="cell">
              {{ article.id }}
            </div>

          </td>

          <td class="el-table_1_column_4">
            <div class="cell">
              {{ article.id }}
            </div>

          </td>

          <td class="el-table_1_column_5">
            <div class="cell">
              <router-link target="_blank" :to="{path:'/editor'}">{{ article.title }}</router-link>
            </div>

          </td>

          <td class="el-table_1_column_6">
            <div class="cell">
              {{ article.id }}
            </div>

          </td>

          <td class="el-table_1_column_7">
            <div class="cell">
              {{ article.id }}
            </div>

          </td>

        </tr>

        </tbody>
      </table>
    </div>

    <pagination :page="page" v-on:changePageRequest="changePageRequest"/>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  name: "Admin",
  components: {Pagination},
  data() {
    return {
      articleList: [
        {
          id: 1,
          title: '1212313fadsfafafsdfafsafdsaf'
        },
        {
          id: 1,
          title: 1212313
        },
        {
          id: 1,
          title: 1212313
        }
      ]
      ,
      page: {
        total: 1,
        pageSize: 20,
        navigatepageNums: [1, 2, 3],
        currentPageNum: 1,
        maxPage: 0,
        minPage: 0
      },
      queryArticleListRequest: {
        pageSize: 11,
        pageNum: 1

      }
    }
  },
  mounted() {
    this.queryArticleList()
  },
  methods: {

    queryArticleList() {
      this.$http
          .post('/api/article/list', this.queryArticleListRequest)
          .then(res => {
            this.articleList = res.list
            this.page = res
            console.log(res)
          })
    },
    changePageRequest: function (newPageRequest) {
      this.queryArticleListRequest = newPageRequest;
      this.queryArticleList()
    }


  }
}
</script>

<style scoped>

.td-0 {
  /*border-left: 1px solid #ddd;*/
  /*border-top:  1px solid #ddd;*/
}

.cell {
  padding-left: 10px;
  padding-right: 10px;
}

table {
  border-collapse: collapse;
  font-size: 14px;
  color: #606266;
}

td {
  padding-top: 10px;
  padding-bottom: 10px;

  border-right: 1px solid #EBEEF5;

  border-bottom: 1px solid #EBEEF5;
  border-left: 1px solid #EBEEF5;

  border-top: 1px solid #EBEEF5;
}
</style>
