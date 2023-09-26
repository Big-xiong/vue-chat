<template>
  <div class="custom-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <el-input
        v-model="platformName"
        clearable
        class="filter-item mr10"
        style="width: 200px"
        :placeholder="$t('platform.platformPlaceholder')"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        @click="
          () => {
            page = 1;
            getPlatformList();
          }
        "
      >
        <i class="material-icons-round fs-18 mr6">search</i
        >{{ $t("action.type.search") }}
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        @click="openDialog('add')"
      >
        <i class="material-icons-round fs-18 mr6">add</i
        >{{ $t("action.type.add") }}
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        @click="openDialog('batch')"
      >
        <i class="material-icons-round fs-18 mr6">edit_note</i
        >{{ $t("action.type.batchEdit") }}
      </el-button>
      <el-tooltip
        :content="$t('platform.addDomainCourse')"
        placement="right"
        effect="light"
      >
        <i class="material-icons-round course" @click="courseVisible = true"
          >help_outline</i
        >
      </el-tooltip>
    </div>

    <!-- 结果表格 -->
    <el-table
      v-loading="loading"
      :data="platformList"
      stripe
      :element-loading-text="$t('table.loading')"
      @selection-change="(platforms) => (batchPlatform = platforms)"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column
        prop="domain_id"
        :label="$t('platform.table.id')"
        align="center"
        width="130"
      />
      <el-table-column
        prop="domain_name"
        :label="$t('platform.table.domain')"
        align="center"
      />
      <el-table-column
        prop="domain_title"
        :label="$t('platform.table.platform')"
        align="center"
      />
      <el-table-column
        prop="hello_title"
        :label="$t('platform.table.sign')"
        align="center"
      />
      <el-table-column :label="$t('action.label')" align="center" width="220">
        <template slot-scope="{ row }">
          <el-button
            v-waves
            size="mini"
            type="primary"
            @click="openDialog('edit', row)"
          >
            <i class="material-icons-round fs-14 mr6"
              >drive_file_rename_outline</i
            >{{ $t("action.type.edit") }}
          </el-button>
          <el-button
            v-waves
            size="mini"
            type="danger"
            @click="deletePlatform(row)"
          >
            <i class="material-icons-round fs-14 mr6">delete_outline</i
            >{{ $t("action.type.delete") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="getPlatformList"
    />

    <!-- 新增、编辑弹窗 -->
    <form-dialog
      ref="formDialog"
      v-bind="dialog"
      @reloadPlatformList="reloadPlatformList"
      @visibleChange="dialog.visible = $event"
      @showPromoteAdd="showPromoteAdd"
    />
    <upload-promote
      ref="uploadPromote"
      v-bind="dialogPromotes"
      @updatePromotes="updatePromotes"
      @visibleChange="dialogPromotes.visible = $event"
    />
    <!-- 教程弹窗 -->
    <el-dialog
      :title="$t('platform.addDomainCourse')"
      :visible.sync="courseVisible"
      :close-on-click-modal="true"
    >
      <video
        ref="video"
        :src="`${baseUrl}/static/seller/images/teach.mp4`"
        controls
        style="width: 100%"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getPlatformList, deletePlatform } from "@/api/platform.js";
import formDialog from "./formDialog.vue";
import uploadPromote from "./uploadPromote.vue";
export default {
  name: "PlatformList",
  components: { formDialog, uploadPromote },
  data() {
    return {
      page: 1,
      limit: 20,
      platformName: "",
      platformList: [],
      batchPlatform: [],
      total: 0,
      dialog: {
        type: "",
        title: "",
        visible: false,
        platformDetail: {},
      },
      dialogPromotes: {},
      loading: true,
      courseVisible: false,
      baseUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  watch: {
    courseVisible(v) {
      this.$nextTick(() => {
        if (v) this.$refs.video.play();
        else this.$refs.video.pause();
      });
    },
  },
  created() {
    this.getPlatformList();
  },
  methods: {
    showPromoteAdd() {
      this.dialogPromotes = {
        visible: true,
        promotes: {
          promoteImg: "",
          promoteLink: "",
        },
      };
    },
    updatePromotes(params) {
      this.$refs.formDialog.updatePromotes(params);
      this.dialogPromotes.visible = false;
    },
    getPlatformList() {
      this.loading = true;
      const { page, limit, platformName } = this;
      getPlatformList({
        page,
        limit,
        domain_title: platformName,
      }).then((res) => {
        const { code, data, count } = res;
        if (code === 0) {
          this.total = count;
          this.platformList = data;
        }
        this.loading = false;
      });
    },
    deletePlatform(platform) {
      const h = this.$createElement;
      this.$confirm(
        this.$t("platform.delete.message", {
          domainName: platform.domain_name,
        }),
        this.$t("platform.delete.tips"),
        {
          confirmButtonText: this.$t("platform.delete.confirm"),
          cancelButtonText: this.$t("platform.delete.cancel"),
          dangerouslyUseHTMLString: true,
          message: h("p", [
            h("svg-icon", {
              props: {
                iconClass: "warning",
              },
            }),
            h(
              "span",
              this.$t("group.delete.message", {
                domainName: platform.domain_name,
              })
            ),
          ]),
        }
      ).then(() => {
        deletePlatform({
          domain_id: platform.domain_id,
        }).then((res) => {
          const { code, msg } = res;
          const success = code === 0;
          if (success) {
            if (this.page > 1 && this.platformList.length === 1) {
              this.page--;
            }
            this.getPlatformList();
          }
          this.$notify({
            message: msg,
            title: success ? this.$t("notify.success") : this.$t("notify.fail"),
            type: success ? "success" : "error",
          });
        });
      });
    },
    reloadPlatformList() {
      if (this.dialog.type == "add") {
        this.page = 1;
      }
      this.getPlatformList();
    },
    openDialog(type, platform = {}) {
      let platformDetail, title;
      const defaultStyle = [
        {
          dataIndex: 1,
          key: "样式一",
          active: true,
          body_color: "#5082f4,#5082f4",
          color_bg: "#f6f8ff,#f6f8ff",
          chatcolor: "#ffffff,#ffffff",
          rightcolor: "#F6F7FB,#F6F7FB",
          font_color: "#e3ebff",

          nbody_color: "#5082f4,#5082f4",
          ncolor_bg: "#393c47,#393c47",
          nchatcolor: "#3D404A,#3D404A",
          nrightcolor: "#33353C,#33353C",
          nfont_color: "#C5d2ec",
          is_new: true,
        },
        {
          dataIndex: 2,
          key: "样式二",
          active: false,
          body_color: "#3563e3,#3563e3",
          color_bg: "#f6f8ff,#f6f8ff",
          chatcolor: "#fcfcfc,#fcfcfc",
          rightcolor: "#f9f9f9,#f9f9f9",
          font_color: "#e3ebff",

          nbody_color: "#3563e3,#3563e3",
          ncolor_bg: "#393c47,#393c47",
          nchatcolor: "#3e3e3e,#3e3e3e",
          nrightcolor: "#323232,#323232",
          nfont_color: "#C5d2ec",
        },
        {
          dataIndex: 3,
          key: "样式三",
          active: false,
          body_color: "#7FBAFD,#7FBAFD",
          color_bg: "#f6f8ff,#f6f8ff",
          chatcolor: "#fcfcfc,#fcfcfc",
          rightcolor: "#F4F4F4,#F4F4F4",
          font_color: "#f0fbff",

          nbody_color: "#7FBAFD,#7FBAFD",
          ncolor_bg: "#393c47,#393c47",
          nchatcolor: "#3e3e3e,#3e3e3e",
          nrightcolor: "#323232,#323232",
          nfont_color: "#C5d2ec",
        },
        {
          dataIndex: 4,
          key: "样式四",
          active: false,
          body_color: "#0A69FF,#355CEB",
          color_bg: "#f6f8ff,#f6f8ff",
          chatcolor: "#F0F6FF,#F8F8F8",
          rightcolor: "#F0F6FF,#F8F8F8",
          font_color: "#e3ebff",

          nbody_color: "#0A69FF,#2b4bc4",
          ncolor_bg: "#393c47,#393c47",
          nchatcolor: "#2C3760,#181C21",
          nrightcolor: "#2C3760,#181C21",
          nfont_color: "#C5d2ec",
        },
      ];
      if (type == "add") {
        title = this.$t("platform.form.addTitle");
        platformDetail = {
          domainId: undefined,
          domainIds: undefined,
          platformName: "",
          domainName: "",
          islayer: 0,
          withdraw: "30000",
          serverSign: "",
          isnight: 0,
          stylenum: 1,
          style: defaultStyle,
          nbody_color: "#3563e3",
          ncolor_bg: "#393c47",
          nfont_color: "#C5d2ec",
          nrightcolor: "#323232",
          nchatcolor: "#3e3e3e",
          body_color: "#3563e3",
          color_bg: "#f6f8ff",
          font_color: "#e3ebff",
          rightcolor: "#f9f9f9",
          chatcolor: "#fcfcfc",
          onlineImg: "",
          chatBg: "",
          skype: "",
          promoteImg: "",
          promoteLink: "",
        };
      } else {
        let {
          domain_id: domainId,
          domain_title: platformName,
          islayer: islayer,
          withdraw: withdraw,
          domain_name: domainName,
          hello_title: serverSign,
          style: style,
          stylenum: stylenum,
          body_color: body_color,
          color_bg: color_bg,
          chatcolor: chatcolor,
          rightcolor: rightcolor,
          font_color: font_color,

          nbody_color: nbody_color,
          ncolor_bg: ncolor_bg,
          nchatcolor: nchatcolor,
          nrightcolor: nrightcolor,
          nfont_color: nfont_color,
          kefu_avatar2: onlineImg,
          kefu_bg: chatBg,
          skype: skype,
          extension_bg: promoteImg,
          extensionUrl: promoteLink,
          isnight,
        } = type == "edit" ? platform : this.firstSelectPlatform();
        console.log("platform:");
        console.log(platform);
        console.log("$t:");
        console.log(this.$t);
        if (type == "edit") {
          title = this.$t("platform.form.editTitle");
          platformDetail = {
            domainId,
            domainIds: undefined,
            platformName,
            islayer,
            withdraw,
            domainName,
            serverSign,
            stylenum,
            style: style.length == defaultStyle.length ? style : defaultStyle,
            nbody_color,
            nfont_color,
            ncolor_bg,
            nrightcolor,
            nchatcolor,
            body_color,
            font_color,
            color_bg,
            rightcolor,
            chatcolor,
            onlineImg,
            chatBg,
            skype,
            promoteImg,
            promoteLink,
            isnight,
          };
        } else if (type == "batch") {
          if (!this.batchPlatform.length) {
            return this.$message({
              message: this.$t("platform.batchTips"),
              type: "error",
            });
          }
          title = this.$t("platform.form.batchEdit");
          domainName = this.batchPlatform
            .map((platform) => platform.domain_name)
            .join("\n");
          const domainIds = this.batchPlatform
            .map((platform) => platform.domain_id)
            .join("#");
          platformDetail = {
            domainId: undefined,
            domainIds,
            platformName,
            islayer,
            withdraw,
            domainName,
            serverSign,
            stylenum,
            style: style.length == defaultStyle.length ? style : defaultStyle,
            nbody_color,
            nfont_color,
            ncolor_bg,
            nrightcolor,
            nchatcolor,
            body_color,
            font_color,
            color_bg,
            rightcolor,
            chatcolor,
            onlineImg,
            chatBg,
            skype,
            promoteImg,
            promoteLink,
            isnight,
          };
        }
      }
      // 把信息传入到dialog中？
      this.dialog = {
        type,
        title,
        visible: true,
        platformDetail,
      };
    },
    firstSelectPlatform() {
      const platformList = JSON.parse(JSON.stringify(this.batchPlatform));
      if (!platformList.length) return {};
      return platformList.sort((p1, p2) => p1.domain_id - p2.domain_id)[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.course {
  margin-left: 16px;
  font-size: 18px;
  color: #01aaed;
  cursor: pointer;
}
</style>
