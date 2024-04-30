<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-row :gutter="20">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><div class="footer-item">
        @CopyRight li
      </div></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="footer-item">
        @CopyRight li
      </div></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="footer-item">
        @CopyRight li
      </div></el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><div class="footer-item">
        @CopyRight li
      </div></el-col>
  </el-row>
</template>
<script setup>
</script>
<style scoped>
/*  */
.el-row {
  margin-bottom: 20px;
  height: 10rem;
  background-color: rgba(246, 249, 249, 0.963);
}
.el-col {
  border-radius: 4px;
  background-color: rgba(246, 249, 249, 0.963);
  color: #000;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

/* */
.footer-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

</style>