<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :close-on-click-modal="false"
    width="900px"
    @close="closeHandler"
  >
    <div>
      <el-form
        v-if="visible"
        ref="form"
        :model="params"
        :rules="rules"
        hide-required-asterisk
        label-width="auto"
      >
        <el-form-item
          class="form_item_center"
          :label="$t('platform.form.label.platformName')"
          prop="platformName"
        >
          <el-input
            v-model="params.platformName"
            :placeholder="$t('platform.form.placeholder.platformName')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.form.label.domainName')"
          prop="domainName"
          style="margin-bottom: 0"
          class="form_item_center"
        >
          <el-input
            v-model="params.domainName"
            :type="type == 'edit' ? '' : 'textarea'"
            :rows="4"
            :disabled="type == 'batch'"
            :placeholder="$t('platform.form.placeholder.domainName')"
          />
        </el-form-item>
        <div class="format" style="padding: 5px 0 5px 38%">
          *格式样例：aichat365.com或www.aichat365.com
        </div>
        <el-form-item
          :label="$t('platform.form.label.islayer')"
          prop="islayer"
          class="form_item_center"
        >
          <el-switch
            v-model="params.islayer"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.form.label.serverSign')"
          prop="serverSign"
          class="form_item_center"
        >
          <el-input
            v-model="params.serverSign"
            :placeholder="$t('platform.form.placeholder.serverSign')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.form.label.skype')"
          prop="skype"
          class="form_item_center"
        >
          <el-input
            v-model="params.skype"
            :placeholder="$t('platform.form.placeholder.skype')"
          />
        </el-form-item>
        <!-- 样式切换 -->
        <div class="styles">
          <div class="label">选择样式</div>
          <div class="style-list">
            <template v-for="(item, index) in params.style">
              <div
                :key="index"
                class="style-item-title"
                :class="item.active ? 'active' : ''"
                @click="changeActive(index)"
              >
                {{ item.key }}
              </div>
            </template>
          </div>
        </div>
        <div class="style-card">
          <template v-for="(item, index) in params.style">
            <div
              v-if="item.active && !item.is_new"
              :key="index"
              class="card-item"
            >
              <div
                class="day-style item-style"
                :style="setColorOrGradient(item.color_bg)"
              >
                <div class="day-pc">
                  <div
                    class="container-header"
                    :style="
                      item.dataIndex == 3
                        ? `${setColorOrGradient(
                            item.chatcolor
                          )}border-bottom:1px solid #f0f0f0;`
                        : setColorOrGradient(item.body_color)
                    "
                  >
                    <div class="header-left">
                      <img
                        :style="
                          item.dataIndex == 2
                            ? 'border-radius:50%;'
                            : 'border-radius:2px;'
                        "
                        :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                      />
                    </div>
                    <div class="header-right">
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >phone_in_talk</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >mail</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >settings</i
                      >
                    </div>
                  </div>
                  <div class="container-center">
                    <div
                      class="center-left"
                      :style="setColorOrGradient(item.chatcolor)"
                    >
                      <div class="chat-content">
                        <div class="chat server">
                          <img
                            :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                            :style="
                              item.dataIndex == 2
                                ? 'border-radius:50%;'
                                : 'border-radius:2px;'
                            "
                          />
                          <span>您好,很高兴</span>
                        </div>
                        <div class="chat customer">
                          <span
                            :style="`background:${contentBg};color:${item.font_color}`"
                            >您好</span
                          >
                        </div>
                      </div>
                      <div class="input">
                        <div class="input-content" />
                        <i
                          class="menu-left__switch material-icons-round"
                          :style="
                            item.dataIndex == 3
                              ? `color:#C2C2C2`
                              : `color:${item.body_color[0]}`
                          "
                          >attachment</i
                        >
                        <el-button
                          type="primary"
                          :class="item.dataIndex == 3 ? 'special' : ''"
                        >
                          <i class="material-icons-round">send</i
                          >{{ $t("chatClient.inputMenu.send") }}
                        </el-button>
                      </div>
                    </div>
                    <div
                      class="center-right"
                      :style="setColorOrGradient(item.rightcolor)"
                    >
                      <div
                        class="question-title"
                        :style="`color:${item.body_color[0]}`"
                      >
                        <i
                          class="material-icons-round question-icon"
                          :style="`background:transparent;color:${item.body_color[0]}`"
                          >lightbulb_outline</i
                        >
                        {{ $t("chatClient.chatBody.question") }}
                      </div>
                      <div class="question">
                        <div class="question-item">1.客服系统怎么收费</div>
                        <div class="question-item">2.爱洽客服系统有</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="day-mobile">
                  <div
                    class="container-header"
                    :style="
                      item.dataIndex == 3
                        ? `${setColorOrGradient(
                            item.chatcolor
                          )}border-bottom:1px solid #f0f0f0;`
                        : setColorOrGradient(item.body_color)
                    "
                  >
                    <div class="header-left">
                      <img
                        :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                        :style="
                          item.dataIndex == 2
                            ? 'border-radius:50%;'
                            : 'border-radius:2px;'
                        "
                      />
                    </div>
                    <div class="header-right">
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >phone_in_talk</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >mail</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >settings</i
                      >
                    </div>
                  </div>
                  <div
                    class="container-center"
                    :style="setColorOrGradient(item.chatcolor)"
                  >
                    <div class="chat-content">
                      <div class="chat server">
                        <img
                          :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                          :style="
                            item.dataIndex == 2
                              ? 'border-radius:50%;'
                              : 'border-radius:2px;'
                          "
                        />
                        <span>您好,很高兴</span>
                      </div>
                      <div class="chat customer">
                        <span
                          :style="`background:${contentBg};color:${item.font_color}`"
                          >您好</span
                        >
                      </div>
                    </div>
                    <div class="input">
                      <div class="input-content" />
                      <i
                        class="menu-left__switch material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `color:#C2C2C2`
                            : `color:${item.body_color[0]}`
                        "
                        >attachment</i
                      >
                      <el-button
                        type="primary"
                        :class="item.dataIndex == 3 ? 'special' : ''"
                      >
                        <i class="material-icons-round">send</i
                        >{{ $t("chatClient.inputMenu.send") }}
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="night-style item-style"
                :style="setColorOrGradient(item.ncolor_bg)"
              >
                <div class="day-pc">
                  <div
                    class="container-header"
                    :style="
                      item.dataIndex == 3
                        ? `${setColorOrGradient(
                            item.nchatcolor
                          )}border-bottom:1px solid #171717;`
                        : setColorOrGradient(item.nbody_color)
                    "
                  >
                    <div class="header-left">
                      <img
                        :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                        :style="
                          item.dataIndex == 2
                            ? 'border-radius:50%;'
                            : 'border-radius:2px;'
                        "
                      />
                    </div>
                    <div class="header-right">
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >phone_in_talk</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >mail</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >settings</i
                      >
                    </div>
                  </div>
                  <div class="container-center">
                    <div
                      class="center-left night"
                      :style="setColorOrGradient(item.nchatcolor)"
                    >
                      <div class="chat-content">
                        <div class="chat server">
                          <img
                            :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                            :style="
                              item.dataIndex == 2
                                ? 'border-radius:50%;'
                                : 'border-radius:2px;'
                            "
                          />
                          <span>您好,很高兴</span>
                        </div>
                        <div class="chat customer">
                          <span
                            :style="`background:${contentBg1};color:${item.nfont_color}`"
                            >您好</span
                          >
                        </div>
                      </div>
                      <div class="input">
                        <div class="input-content night" />
                        <i
                          class="menu-left__switch material-icons-round"
                          :style="
                            item.dataIndex == 3
                              ? `color:#C2C2C2`
                              : `color:${item.nbody_color[0]}`
                          "
                          >attachment</i
                        >
                        <el-button
                          type="primary"
                          :class="item.dataIndex == 3 ? 'special' : ''"
                        >
                          <i class="material-icons-round">send</i
                          >{{ $t("chatClient.inputMenu.send") }}
                        </el-button>
                      </div>
                    </div>
                    <div
                      class="center-right"
                      :style="setColorOrGradient(item.nrightcolor)"
                    >
                      <!-- <div class="center-right" :style="`background:${item.nrightcolor}`"> -->
                      <div
                        class="question-title"
                        :style="`color:${item.nbody_color[0]}`"
                      >
                        <i
                          class="material-icons-round question-icon"
                          :style="`background:transparent;color:${item.nbody_color[0]}`"
                          >lightbulb_outline</i
                        >{{ $t("chatClient.chatBody.question") }}
                      </div>
                      <div class="question">
                        <div class="question-item">1.客服系统怎么收费</div>
                        <div class="question-item">2.爱洽客服系统有</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="day-mobile">
                  <div
                    class="container-header"
                    :style="
                      item.dataIndex == 3
                        ? `${setColorOrGradient(
                            item.nchatcolor
                          )}border-bottom:1px solid #171717;`
                        : setColorOrGradient(item.nbody_color)
                    "
                  >
                    <div class="header-left">
                      <img
                        :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                        :style="
                          item.dataIndex == 2
                            ? 'border-radius:50%;'
                            : 'border-radius:2px;'
                        "
                      />
                    </div>
                    <div class="header-right">
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >phone_in_talk</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >mail</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >settings</i
                      >
                    </div>
                  </div>
                  <div
                    class="container-center"
                    :style="setColorOrGradient(item.nchatcolor)"
                  >
                    <div class="chat-content">
                      <div class="chat server">
                        <img
                          :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                          :style="
                            item.dataIndex == 2
                              ? 'border-radius:50%;'
                              : 'border-radius:2px;'
                          "
                        />
                        <span>您好,很高兴</span>
                      </div>
                      <div class="chat customer">
                        <span
                          :style="`background:${contentBg1};color:${item.nfont_color}`"
                          >您好</span
                        >
                      </div>
                    </div>
                    <div class="input">
                      <div class="input-content night" />
                      <i
                        class="menu-left__switch material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `color:#C2C2C2`
                            : `color:${item.nbody_color[0]}`
                        "
                        >attachment</i
                      >
                      <el-button
                        type="primary"
                        :class="item.dataIndex == 3 ? 'special' : ''"
                      >
                        <i class="material-icons-round">send</i
                        >{{ $t("chatClient.inputMenu.send") }}
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else-if="item.active && item.is_new"
              :key="index + 1"
              class="card-item new"
            >
              <div
                class="day-style item-style"
                :style="setColorOrGradient(item.color_bg)"
              >
                <div class="day-pc">
                  <div
                    class="container-header"
                    :style="
                      item.dataIndex == 3
                        ? `${setColorOrGradient(
                            item.chatcolor
                          )}border-bottom:1px solid #f0f0f0;`
                        : item.dataIndex === 1
                        ? setColorOrGradient(item.chatcolor)
                        : setColorOrGradient(item.body_color)
                    "
                  >
                    <div class="header-left">
                      <img
                        :style="
                          item.dataIndex == 2
                            ? 'border-radius:50%;'
                            : 'border-radius:2px;'
                        "
                        :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                      />
                    </div>
                    <div class="header-right">
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;'
                        "
                        >phone_in_talk</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;'
                        "
                        >mail</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;'
                        "
                        >settings</i
                      >
                    </div>
                  </div>
                  <div
                    class="container-center"
                    :style="setColorOrGradient(item.chatcolor)"
                  >
                    <div
                      class="center-left"
                      :style="setColorOrGradient(item.chatcolor)"
                    >
                      <div class="chat-content">
                        <div class="chat server">
                          <img
                            :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                            :style="
                              item.dataIndex == 2
                                ? 'border-radius:50%;'
                                : 'border-radius:2px;'
                            "
                          />
                          <span>您好,很高兴</span>
                        </div>
                        <div class="chat customer">
                          <span
                            :style="
                              item.dataIndex === 1
                                ? `${setColorOrGradient(
                                    item.body_color
                                  )};color:${item.font_color}`
                                : `background:${contentBg};color:${item.font_color}`
                            "
                            >您好</span
                          >
                        </div>
                      </div>
                      <div class="input">
                        <div class="input-content" />
                        <i
                          class="menu-left__switch material-icons-round"
                          style="color: #72798c"
                          >attachment</i
                        >
                        <el-button
                          type="primary"
                          :class="item.dataIndex == 3 ? 'special' : ''"
                        >
                          <i class="material-icons-round">send</i
                          >{{ $t("chatClient.inputMenu.send") }}
                        </el-button>
                      </div>
                    </div>
                    <div
                      class="center-right"
                      :style="setColorOrGradient(item.rightcolor)"
                    >
                      <div class="question-title">
                        <i class="material-icons-round question-icon"
                          >lightbulb_outline</i
                        >
                        {{ $t("chatClient.chatBody.question") }}
                      </div>
                      <div class="question">
                        <div class="question-item">1.客服系统怎么收费</div>
                        <div class="question-item">2.爱洽客服系统有</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="day-mobile"
                  :style="setColorOrGradient(item.chatcolor)"
                >
                  <div
                    class="container-header"
                    :style="
                      item.dataIndex == 3
                        ? `${setColorOrGradient(
                            item.chatcolor
                          )}border-bottom:1px solid #f0f0f0;`
                        : item.dataIndex === 1
                        ? setColorOrGradient(item.chatcolor)
                        : setColorOrGradient(item.body_color)
                    "
                  >
                    <div class="header-left">
                      <img
                        :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                        :style="
                          item.dataIndex == 2
                            ? 'border-radius:50%;'
                            : 'border-radius:2px;'
                        "
                      />
                    </div>
                    <div class="header-right">
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >phone_in_talk</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >mail</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.body_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >settings</i
                      >
                    </div>
                  </div>
                  <div
                    class="center-top"
                    :style="setColorOrGradient(item.rightcolor)"
                  >
                    <div class="question-title">
                      <i class="material-icons-round question-icon"
                        >lightbulb_outline</i
                      >
                      {{ $t("chatClient.chatBody.question") }}
                    </div>
                    <div class="question">
                      <div class="question-item">1.客服系统怎么收费</div>
                      <div class="question-item">2.爱洽客服系统有</div>
                    </div>
                  </div>
                  <div
                    class="container-center"
                    :style="setColorOrGradient(item.chatcolor)"
                  >
                    <div class="chat-content">
                      <div class="chat server">
                        <img
                          :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                          :style="
                            item.dataIndex == 2
                              ? 'border-radius:50%;'
                              : 'border-radius:2px;'
                          "
                        />
                        <span>您好,很高兴</span>
                      </div>
                      <div class="chat customer">
                        <span
                          :style="
                            item.dataIndex === 1
                              ? `${setColorOrGradient(item.body_color)};color:${
                                  item.font_color
                                }`
                              : `background:${contentBg};color:${item.font_color}`
                          "
                          >您好</span
                        >
                      </div>
                    </div>
                    <div class="input">
                      <div class="input-content" />
                      <i
                        class="menu-left__switch material-icons-round"
                        style="color: #72798c"
                        >attachment</i
                      >
                      <el-button
                        type="primary"
                        :class="item.dataIndex == 3 ? 'special' : ''"
                      >
                        <i class="material-icons-round">send</i
                        >{{ $t("chatClient.inputMenu.send") }}
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="night-style item-style"
                :style="setColorOrGradient(item.ncolor_bg)"
              >
                <div class="day-pc">
                  <div
                    class="container-header"
                    :style="
                      item.dataIndex == 3
                        ? `${setColorOrGradient(
                            item.nchatcolor
                          )}border-bottom:1px solid #171717;`
                        : item.dataIndex === 1
                        ? setColorOrGradient(item.nchatcolor)
                        : setColorOrGradient(item.nbody_color)
                    "
                  >
                    <div class="header-left">
                      <img
                        :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                        :style="
                          item.dataIndex == 2
                            ? 'border-radius:50%;'
                            : 'border-radius:2px;'
                        "
                      />
                    </div>
                    <div class="header-right">
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >phone_in_talk</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >mail</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >settings</i
                      >
                    </div>
                  </div>
                  <div
                    class="container-center"
                    :style="setColorOrGradient(item.nchatcolor)"
                  >
                    <div
                      class="center-left night"
                      :style="setColorOrGradient(item.nchatcolor)"
                    >
                      <div class="chat-content">
                        <div class="chat server">
                          <img
                            :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                            :style="
                              item.dataIndex == 2
                                ? 'border-radius:50%;'
                                : 'border-radius:2px;'
                            "
                          />
                          <span>您好,很高兴</span>
                        </div>
                        <div class="chat customer">
                          <span
                            :style="
                              item.dataIndex === 1
                                ? `${setColorOrGradient(
                                    item.nbody_color
                                  )};color:${item.nfont_color}`
                                : `background:${contentBg1};color:${item.nfont_color}`
                            "
                            >您好</span
                          >
                        </div>
                      </div>
                      <div class="input">
                        <div class="input-content night" />
                        <i
                          class="menu-left__switch material-icons-round"
                          :style="
                            item.dataIndex == 3
                              ? `color:#C2C2C2`
                              : `color:${item.nbody_color[0]}`
                          "
                          >attachment</i
                        >
                        <el-button
                          type="primary"
                          :class="item.dataIndex == 3 ? 'special' : ''"
                        >
                          <i class="material-icons-round">send</i
                          >{{ $t("chatClient.inputMenu.send") }}
                        </el-button>
                      </div>
                    </div>
                    <div
                      class="center-right"
                      :style="setColorOrGradient(item.nrightcolor)"
                    >
                      <!-- <div class="center-right" :style="`background:${item.nrightcolor}`"> -->
                      <div
                        class="question-title"
                        :style="`color:${item.nbody_color[0]}`"
                      >
                        <i
                          class="material-icons-round question-icon"
                          :style="`background:transparent;color:${item.nbody_color[0]}`"
                          >lightbulb_outline</i
                        >{{ $t("chatClient.chatBody.question") }}
                      </div>
                      <div class="question">
                        <div class="question-item">1.客服系统怎么收费</div>
                        <div class="question-item">2.爱洽客服系统有</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="day-mobile"
                  :style="setColorOrGradient(item.nchatcolor)"
                >
                  <div
                    class="container-header"
                    :style="
                      item.dataIndex == 3
                        ? `${setColorOrGradient(
                            item.nchatcolor
                          )}border-bottom:1px solid #171717;`
                        : item.dataIndex === 1
                        ? setColorOrGradient(item.nchatcolor)
                        : setColorOrGradient(item.nbody_color)
                    "
                  >
                    <div class="header-left">
                      <img
                        :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                        :style="
                          item.dataIndex == 2
                            ? 'border-radius:50%;'
                            : 'border-radius:2px;'
                        "
                      />
                    </div>
                    <div class="header-right">
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >phone_in_talk</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >mail</i
                      >
                      <i
                        class="material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `background:transparent;color:${item.nbody_color[0]}`
                            : 'background:transparent;opacity: 0.3;'
                        "
                        >settings</i
                      >
                    </div>
                  </div>
                  <div
                    class="center-top"
                    :style="setColorOrGradient(item.nrightcolor)"
                  >
                    <div class="question-title">
                      <i class="material-icons-round question-icon"
                        >lightbulb_outline</i
                      >
                      {{ $t("chatClient.chatBody.question") }}
                    </div>
                    <div class="question">
                      <div class="question-item">1.客服系统怎么收费</div>
                      <div class="question-item">2.爱洽客服系统有</div>
                    </div>
                  </div>
                  <div
                    class="container-center"
                    :style="setColorOrGradient(item.nchatcolor)"
                  >
                    <div class="chat-content">
                      <div class="chat server">
                        <img
                          :src="`${baseUrl}/uploads/20220120/6af5abd1dcf13090547ec4370fb12646.png`"
                          :style="
                            item.dataIndex == 2
                              ? 'border-radius:50%;'
                              : 'border-radius:2px;'
                          "
                        />
                        <span>您好,很高兴</span>
                      </div>
                      <div class="chat customer">
                        <span
                          :style="
                            item.dataIndex === 1
                              ? `${setColorOrGradient(
                                  item.nbody_color
                                )};color:${item.nfont_color}`
                              : `background:${contentBg1};color:${item.nfont_color}`
                          "
                          >您好</span
                        >
                      </div>
                    </div>
                    <div class="input">
                      <div class="input-content night" />
                      <i
                        class="menu-left__switch material-icons-round"
                        :style="
                          item.dataIndex == 3
                            ? `color:#C2C2C2`
                            : `color:${item.nbody_color[0]}`
                        "
                        >attachment</i
                      >
                      <el-button
                        type="primary"
                        :class="item.dataIndex == 3 ? 'special' : ''"
                      >
                        <i class="material-icons-round">send</i
                        >{{ $t("chatClient.inputMenu.send") }}
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <el-form-item
          :label="$t('platform.form.label.switch')"
          prop="isnight"
          style="margin-bottom: 10px"
          class="form_item_center"
        >
          <el-switch
            v-model="params.isnight"
            :active-value="1"
            :inactive-value="0"
            style="margin-left: -12px"
          />
          <el-button
            type="text"
            style="margin-left: 140px"
            @click="setThemeDefault"
            >恢复默认颜色</el-button
          >
        </el-form-item>
        <!-- 夜晚白天模式的颜色设置 -->
        <template v-for="(item, index) in params.style">
          <div v-if="item.active" :key="index" class="theme-area">
            <div>
              <div class="title">{{ $t("platform.form.label.night") }}</div>
              <div class="night">
                <div>
                  <span>{{ $t("platform.form.label.nightThemeColor") }}</span>
                  <el-color-picker
                    v-model="item.nbody_color[0]"
                    size="medium"
                  />
                  <el-color-picker
                    v-if="item.nbody_color.length > 1"
                    v-model="item.nbody_color[1]"
                    size="medium"
                  />
                </div>
                <div>
                  <span>{{ $t("platform.form.label.nightWbgColor") }}</span>
                  <el-color-picker v-model="item.ncolor_bg[0]" size="medium" />
                  <el-color-picker
                    v-if="item.ncolor_bg.length > 1"
                    v-model="item.ncolor_bg[1]"
                    size="medium"
                  />
                </div>
                <div>
                  <span>{{ $t("platform.form.label.nightChatBgColor") }}</span>
                  <el-color-picker v-model="item.nchatcolor[0]" size="medium" />
                  <el-color-picker
                    v-if="item.nchatcolor.length > 1"
                    v-model="item.nchatcolor[1]"
                    size="medium"
                  />
                </div>
                <div>
                  <span>{{ $t("platform.form.label.nightRightColor") }}</span>
                  <el-color-picker
                    v-model="item.nrightcolor[0]"
                    size="medium"
                  />
                  <el-color-picker
                    v-if="item.nrightcolor.length > 1"
                    v-model="item.nrightcolor[1]"
                    size="medium"
                  />
                </div>
                <div>
                  <span>{{ $t("platform.form.label.nightFontColor") }}</span>
                  <el-color-picker v-model="item.nfont_color" size="medium" />
                </div>
              </div>
            </div>
            <div>
              <div class="title">{{ $t("platform.form.label.day") }}</div>
              <div class="day">
                <div>
                  <span>{{ $t("platform.form.label.dayThemeColor") }}</span>
                  <el-color-picker v-model="item.body_color[0]" size="medium" />
                  <el-color-picker
                    v-if="item.body_color.length > 1"
                    v-model="item.body_color[1]"
                    size="medium"
                  />
                </div>
                <div>
                  <span>{{ $t("platform.form.label.dayWbgColor") }}</span>
                  <el-color-picker v-model="item.color_bg[0]" size="medium" />
                  <el-color-picker
                    v-if="item.color_bg.length > 1"
                    v-model="item.color_bg[1]"
                    size="medium"
                  />
                </div>
                <div>
                  <span>{{ $t("platform.form.label.dayChatBgColor") }}</span>
                  <el-color-picker v-model="item.chatcolor[0]" size="medium" />
                  <el-color-picker
                    v-if="item.chatcolor.length > 1"
                    v-model="item.chatcolor[1]"
                    size="medium"
                  />
                </div>
                <div>
                  <span>{{ $t("platform.form.label.dayRightColor") }}</span>
                  <el-color-picker v-model="item.rightcolor[0]" size="medium" />
                  <el-color-picker
                    v-if="item.rightcolor.length > 1"
                    v-model="item.rightcolor[1]"
                    size="medium"
                  />
                </div>
                <div>
                  <span>{{ $t("platform.form.label.dayFontColor") }}</span>
                  <el-color-picker v-model="item.font_color" size="medium" />
                </div>
              </div>
            </div>
          </div>
        </template>
        <el-form-item
          :label="$t('platform.form.label.onlineImg')"
          prop="onlineImg"
          class="form_item_center"
        >
          <upload v-model="params.onlineImg" />
        </el-form-item>
        <el-form-item
          :label="$t('platform.form.label.chatBg')"
          prop="chatBg"
          class="form_item_center editor_width_68"
        >
          <upload v-model="params.chatBg" />
        </el-form-item>
        <div class="promote form_item_center">
          <div class="promote-title">
            {{ $t("platform.form.label.promoteImg") }}
          </div>
          <div class="promote-list">
            <div v-for="(item, index) in promotes" :key="index" class="img">
              <img :src="`${baseUrl}${item.promoteImg}`" alt="" />
              <div class="delete">
                <i class="el-icon-delete" @click.stop="deleteImage(index)" />
              </div>
            </div>
            <div class="upload-btn" @click="showPromoteAdd">
              <i class="el-icon-plus" />
            </div>
          </div>
        </div>
        <!-- <div style="line-height: 1; font-size: 13px; margin-left: 84px">
          {{ $t("platform.form.label.picSize") }}
        </div> -->
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="closeHandler">{{
        $t("action.type.cancel")
      }}</el-button>
      <el-button
        type="primary"
        :loading="buttonLoading"
        @click="submitHandler"
        >{{ $t("action.type.confirm") }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { platformHandler } from "@/api/platform.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
    },
    platformDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      promotes: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      timeOptions: [
        {
          label: this.$t("platform.form.unit.close"),
          value: "0",
        },
        {
          label: `10${this.$t("platform.form.unit.s")}`,
          value: "10000",
        },
        {
          label: `30${this.$t("platform.form.unit.s")}`,
          value: "30000",
        },
        {
          label: `1${this.$t("platform.form.unit.m")}`,
          value: "60000",
        },
        {
          label: `2${this.$t("platform.form.unit.m")}`,
          value: "120000",
        },
        {
          label: `3${this.$t("platform.form.unit.m")}`,
          value: "180000",
        },
        {
          label: `5${this.$t("platform.form.unit.m")}`,
          value: "300000",
        },
      ],
      defaultStyle: [
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
          body_color: "#5082F4FF,#5082F4FF",
          color_bg: "#f6f8ff,#f6f8ff",
          chatcolor: "#fcfcfc,#fcfcfc",
          rightcolor: "#f9f9f9,#f9f9f9",
          font_color: "#e3ebff",

          nbody_color: "#5082F4FF,#5082F4FF",
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
      ],
      params: {
        domainId: "",
        domainIds: "",
        platformName: "",
        islayer: 0,
        withdraw: "30000",
        domainName: "",
        serverSign: "",
        skype: "",
        isnight: 0,
        // themeColor: '',
        // bgColor: '',
        // fontColor: '',
        body_color: "",
        color_bg: "",
        chatcolor: "",
        rightcolor: "",
        font_color: "",
        nbody_color: "",
        nfont_color: "",
        ncolor_bg: "",
        nrightcolor: "",
        nchatcolor: "",
        style: "",
        stylenum: 1,
        onlineImg: "",
        chatBg: "",
        promoteImg: "",
        promoteLink: "",
      },
      rules: {
        platformName: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("platform.form.tips.platformName"),
          },
        ],
        domainName: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("platform.form.tips.domainName"),
          },
        ],
      },
      buttonLoading: false,
      httpReg: /http[s]?:\/\//,
    };
  },
  computed: {
    contentBg() {
      let params;
      for (let index = 0; index < this.params.style.length; index++) {
        if (this.params.style[index].active) {
          params = this.params.style[index];
        }
      }
      if (params) {
        const red = params.body_color[0].substring(1, 3);
        const green = params.body_color[0].substring(3, 5);
        const blue = params.body_color[0].substring(5);
        const redHex = parseInt(red, "16");
        const greenHex = parseInt(green, "16");
        const blueHex = parseInt(blue, "16");
        return `rgba(${redHex},${greenHex},${blueHex},.85)`;
      } else {
        return "";
      }
    },
    contentBg1() {
      let params;
      for (let index = 0; index < this.params.style.length; index++) {
        if (this.params.style[index].active) {
          params = this.params.style[index];
        }
      }
      if (params) {
        const red = params.nbody_color[0].substring(1, 3);
        const green = params.nbody_color[0].substring(3, 5);
        const blue = params.nbody_color[0].substring(5);
        const redHex = parseInt(red, "16");
        const greenHex = parseInt(green, "16");
        const blueHex = parseInt(blue, "16");
        return `rgba(${redHex},${greenHex},${blueHex},.85)`;
      } else {
        return "";
      }
    },
  },
  watch: {
    platformDetail(v) {
      const params = JSON.parse(JSON.stringify(v));
      for (let index = 0; index < params.style.length; index++) {
        params.style[index].body_color =
          params.style[index].body_color.split(",");
        params.style[index].color_bg = params.style[index].color_bg.split(",");
        params.style[index].chatcolor =
          params.style[index].chatcolor.split(",");
        params.style[index].rightcolor =
          params.style[index].rightcolor.split(",");
        params.style[index].font_color = params.style[index].font_color;

        params.style[index].nbody_color =
          params.style[index].nbody_color.split(",");
        params.style[index].ncolor_bg =
          params.style[index].ncolor_bg.split(",");
        params.style[index].nchatcolor =
          params.style[index].nchatcolor.split(",");
        params.style[index].nrightcolor =
          params.style[index].nrightcolor.split(",");
        params.style[index].nfont_color = params.style[index].nfont_color;
      }
      this.params = params;
      // console.log(this.params);
      this.promotes = [];
      if (this.params.promoteImg && this.params.promoteLink) {
        const promoteImg = this.params.promoteImg.split(";");
        const promoteLink = this.params.promoteLink.split(";");
        if (promoteImg.length != promoteLink.length) {
          return;
        }
        for (let index = 0; index < promoteImg.length; index++) {
          this.promotes.push({
            promoteImg: promoteImg[index],
            promoteLink: promoteLink[index],
          });
        }
      }
    },
  },
  methods: {
    setColorOrGradient(color) {
      if (!color) {
        return "";
      }
      if (color.length > 1) {
        return `background-image: linear-gradient(to bottom, ${color[0]} , ${color[1]});`;
      } else {
        return `background:${color[0]};`;
      }
    },
    // setColorOrGradient(color) {
    // 	if(!color){
    // 		return ''
    // 	}
    // 	if(color.indexOf(',') != -1){
    // 		let _color = color.split(',')
    // 		return `background-image: linear-gradient(to right, ${_color[0]} , ${_color[1]});`
    // 	}else{
    // 		return `background:${color};`
    // 	}
    // },
    changeActive(idx) {
      for (let index = 0; index < this.params.style.length; index++) {
        if (index === idx) {
          this.params.style[index].active = true;
          this.params.stylenum = this.params.style[index].dataIndex;
        } else {
          this.params.style[index].active = false;
        }
      }
    },
    showPromoteAdd() {
      this.$emit("showPromoteAdd");
    },
    updatePromotes(params) {
      this.promotes.push({
        promoteImg: params.promoteImg,
        promoteLink: params.promoteLink,
      });
    },
    deleteImage(index) {
      this.promotes.splice(index, 1);
    },
    submitHandler() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const path = {
            batch: "/api/pedit",
            add: "/api/adddomain",
            edit: "/api/editDomain",
          }[this.type];
          const {
            domainId: domain_id,
            domainIds: domian_ids,
            platformName: domain_title,
            withdraw: withdraw,
            islayer: islayer,
            domainName: domain_name,
            serverSign: hello_title,

            // body_color: body_color,
            // color_bg: color_bg,
            // chatcolor:chatcolor,
            // rightcolor:rightcolor,
            // font_color: font_color,

            // nbody_color: nbody_color,
            // ncolor_bg: ncolor_bg,
            // nchatcolor:nchatcolor,
            // nrightcolor:nrightcolor,
            // nfont_color: nfont_color,

            onlineImg: kefu_avatar2,
            chatBg: kefu_bg,
            skype: skype,
            stylenum: stylenum,
            // promoteImg: extension_bg,
            // promoteLink: extensionUrl,
            isnight,
          } = this.params;
          let body_color,
            color_bg,
            chatcolor,
            rightcolor,
            font_color,
            nbody_color,
            ncolor_bg,
            nchatcolor,
            nrightcolor,
            nfont_color;

          const _params = this.$deepcopy(this.params.style);
          console.log("_params");
          this.$deepcopy(this.params);
          for (let index = 0; index < _params.length; index++) {
            // 组合存入数据库
            _params[index].body_color = _params[index].body_color.join(",");
            _params[index].color_bg = _params[index].color_bg.join(",");
            _params[index].chatcolor = _params[index].chatcolor.join(",");
            _params[index].rightcolor = _params[index].rightcolor.join(",");

            _params[index].nbody_color = _params[index].nbody_color.join(",");
            _params[index].ncolor_bg = _params[index].ncolor_bg.join(",");
            _params[index].nchatcolor = _params[index].nchatcolor.join(",");
            _params[index].nrightcolor = _params[index].nrightcolor.join(",");

            if (_params[index].active) {
              body_color = _params[index].body_color;
              color_bg = _params[index].color_bg;
              chatcolor = _params[index].chatcolor;
              rightcolor = _params[index].rightcolor;
              font_color = _params[index].font_color;

              nbody_color = _params[index].nbody_color;
              ncolor_bg = _params[index].ncolor_bg;
              nchatcolor = _params[index].nchatcolor;
              nrightcolor = _params[index].nrightcolor;
              nfont_color = _params[index].nfont_color;
            }
          }
          // const body_color = this.params.style[this.params.active].body_color
          // const color_bg = this.params.style[this.params.active].color_bg
          // const chatcolor = this.params.style[this.params.active].chatcolor
          // const rightcolor = this.params.style[this.params.active].rightcolor
          // const font_color = this.params.style[this.params.active].font_color

          // const nbody_color = this.params.style[this.params.active].nbody_color
          // const ncolor_bg = this.params.style[this.params.active].ncolor_bg
          // const nchatcolor = this.params.style[this.params.active].nchatcolor
          // const nrightcolor = this.params.style[this.params.active].nrightcolor
          // const nfont_color = this.params.style[this.params.active].nfont_color
          // for (let index = 0; index < this.params.style.length; index++) {
          // 	if(index == this.params.active){
          // 		this.params.style.active = true
          // 	}else{
          // 		this.params.style.active = false
          // 	}
          // }

          let extension_bg = "";
          let extensionUrl = "";
          for (let index = 0; index < this.promotes.length; index++) {
            extension_bg += extension_bg
              ? `;${this.promotes[index].promoteImg}`
              : this.promotes[index].promoteImg;
            extensionUrl += extensionUrl
              ? `;${this.promotes[index].promoteLink}`
              : this.promotes[index].promoteLink;
          }
          const test = await this.testDomain(domain_name);
          if (!test) {
            return;
          }
          const params = {
            domian_ids,
            domain_id,
            domain_title,
            domain_name: this.domainHandler(domain_name),
            islayer,
            withdraw,
            hello_title,
            kefu_bg,
            skype,
            body_color,
            color_bg,
            font_color,
            chatcolor,
            rightcolor,
            nbody_color,
            ncolor_bg,
            nchatcolor,
            nrightcolor,
            nfont_color,
            kefu_avatar2,
            extension_bg,
            extensionUrl,
            isnight,
            stylenum,
            style: JSON.stringify(_params),
          };
          // console.log(params);
          // return
          this.buttonLoading = true;
          platformHandler(path, params).then((res) => {
            const { code, msg } = res;
            const success = code === 0;
            if (success) {
              this.$emit("reloadPlatformList");
              this.closeHandler();
            }
            this.$notify({
              message: msg,
              title: success
                ? this.$t("notify.success")
                : this.$t("notify.fail"),
              type: success ? "success" : "error",
            });
            this.buttonLoading = false;
          });
        }
      });
    },
    testDomain(domain_name) {
      let domains;
      if (domain_name.indexOf("/n") > -1) {
        domains = domain_name.split("/n");
        for (let index = 0; index < domains.length; index++) {
          const flag = this.domainReg[domains[index]];
          if (!flag) {
            return false;
          }
        }
        return true;
      } else {
        return this.domainReg(domain_name);
      }
    },
    domainReg(domain_name) {
      let domain;
      if (
        domain_name.indexOf(".") > 0 &&
        domain_name.indexOf(".") != domain_name.length - 1
      ) {
        const _domain = domain_name.split(".");
        domain = _domain[_domain.length - 1];
      } else {
        this.$notify({
          message: "域名验证不合法，请重新编辑",
          title: this.$t("notify.fail"),
          type: "error",
        });
        return false;
      }
      // var reg = ['com','edu','gov','int','mil','net','org','biz','info','name','museum','coop','aero','top','cn'];
      // if(reg.indexOf(domain.toString('.')) == -1){
      // 	this.$notify({
      // 		message:'域名验证不合法，请重新编辑',
      // 		title:this.$t('notify.fail'),
      // 		type:'error'
      // 	})
      // 	return false
      // }
      return true;
    },
    domainHandler(domain) {
      if (domain) {
        return domain
          .split("\n")
          .map((item) => item.replace(this.httpReg, ""))
          .join("&");
      } else {
        return "";
      }
    },
    closeHandler() {
      this.buttonLoading = false;
      this.$emit("visibleChange", false);
    },
    setThemeDefault() {
      this.$confirm(
        this.$t("platform.default.message"),
        this.$t("platform.default.tips"),
        {
          confirmButtonText: this.$t("platform.default.confirm"),
          cancelButtonText: this.$t("platform.default.cancel"),
          dangerouslyUseHTMLString: true,
        }
      ).then(() => {
        for (let index = 0; index < this.params.style.length; index++) {
          if (this.params.style[index].active) {
            this.params.style[index].nbody_color =
              this.defaultStyle[index].nbody_color.split(",");
            this.params.style[index].ncolor_bg =
              this.defaultStyle[index].ncolor_bg.split(",");
            this.params.style[index].nrightcolor =
              this.defaultStyle[index].nrightcolor.split(",");
            this.params.style[index].nchatcolor =
              this.defaultStyle[index].nchatcolor.split(",");
            this.params.style[index].nfont_color =
              this.defaultStyle[index].nfont_color;

            this.params.style[index].body_color =
              this.defaultStyle[index].body_color.split(",");
            this.params.style[index].color_bg =
              this.defaultStyle[index].color_bg.split(",");
            this.params.style[index].rightcolor =
              this.defaultStyle[index].rightcolor.split(",");
            this.params.style[index].chatcolor =
              this.defaultStyle[index].chatcolor.split(",");
            this.params.style[index].font_color =
              this.defaultStyle[index].font_color;
          }
        }
      });
    },
  },
};
</script>
<style  lang="scss">
::v-deep.el-dialog .el-form .el-form-item__content {
  width: 36px !important;
}
</style>
<style lang="scss" scoped>
::v-deep.special.el-button--primary {
  background-color: #e57a7a;
  border-color: #e57a7a;
}
::v-deep.el-color-picker--medium .el-color-picker__trigger {
  width: 28px;
}
// 自定义修改样式：liu
::v-deep .el-input--medium .el-input__inner {
  height: 47px;
  line-height: 47px;
  width: 370px;
  background: #f6f7fbff !important;
}
.styles .label {
  height: 47px;
  line-height: 47px;
  text-align: right !important;
  padding-right: 22px !important;
}
.theme-area .title {
  padding-left: 12px !important;
}

.theme-area .night > div[data-v-1439e41e]:after,
.theme-area .day > div[data-v-1439e41e]:after {
  border-right: none;
}
::v-deep .el-switch.is-checked .el-switch__core {
  border-color: #6ecc94ff;
  background-color: #6ecc94ff;
}
::v-deep .el-color-picker--medium {
  height: 30px;
}
::v-deep .el-color-picker__trigger {
  width: 25px !important;
  height: 25px !important;
  padding: 6px;
  margin-right: 5px;
}
::v-deep .el-upload--text {
  border: 1px dashed #5082f4ff !important;
}
::v-deep .el-form-item--medium .el-form-item__label {
  width: 95px !important;
  padding-right: 25px;
  height: 47px;
  line-height: 47px;
}
::v-deep .avatar-uploader .avatar-uploader-icon {
  color: #5082f4ff !important;
}
::v-deep .el-icon-arrow-down {
  display: none;
}

.title {
  color: #28324c;
}
::v-deep.el-input .el-input__wrapper {
  background-color: f6f7fb !important;
}
.form_item_center {
  padding: 0 26%;
}

// end
.material-icons-round {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  color: #ffffff;
  .question-icon {
    color: rgb(53, 99, 227);
    font-size: 10px;
  }
}
.styles {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  padding-left: 27%;
  .label {
    width: 82px;
    text-align: left;
    padding-right: 12px;
    box-sizing: border-box;
  }
  .style-list {
    flex: 1;
    display: flex;
    .style-item-title {
      margin-right: 10px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 15px;
      box-sizing: border-box;
      background: #5082f41a;
      color: #5082f4ff;
      border-radius: 12px;
      cursor: pointer;
      &.active {
        background: #5082f4ff;
        color: #fff;
      }
    }
  }
}
.style-card {
  box-sizing: border-box;
  margin-bottom: 10px;
  .card-item {
    display: flex;
    align-items: center;
    &.new {
      .day-style {
        .day-pc {
          // .container-center{
          //   background: #fff;
          // }
          .center-right {
            margin: 0 6px 6px 0;
            border-radius: 4px;
            .question-title {
              color: #28324c !important;
              .question-icon {
                color: #28324c !important;
              }
            }
          }
        }
        .day-mobile {
          .chat-content {
            height: 64px !important;
          }
          .container-center {
            height: 110px !important;
          }
          .center-top {
            font-size: 8px;
            flex: 1;
            // width: 70px;
            // padding: 10px 0;
            box-sizing: border-box;
            margin: 0 6px;
            .question-title {
              color: #28324c;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
              transform: scale(0.7);
              .question-icon {
                color: #28324c;
              }
            }
            .question {
              color: #808080;
              .question-item {
                margin-bottom: 5px;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
                transform: scale(0.7);
              }
            }
          }
        }
        .day-pc,
        .day-mobile {
          .container-header {
            .material-icons-round {
              color: #28324c !important;
              opacity: 1 !important;
            }
          }
          .container-center {
            .input {
              .el-button {
                border-radius: 12px !important;
                .material-icons-round {
                  background: transparent !important;
                }
              }
            }
          }
          .chat-content {
            .chat {
              &.server {
                span {
                  background: #f6f7fb;
                }
              }
              &.customer {
                span {
                  // background: #5082F4 !important;
                }
              }
            }
          }
        }
      }
      .night-style {
        .day-pc {
          // .container-center{
          //   background: #3D404A;
          // }
          .center-right {
            margin: 0 6px 6px 0;
            border-radius: 4px;
            .question-title {
              color: #fff !important;
              .question-icon {
                color: #fff !important;
              }
            }
          }
        }
        .day-mobile {
          .chat-content {
            height: 64px !important;
          }
          .container-center {
            height: 110px !important;
          }
          .center-top {
            font-size: 8px;
            flex: 1;
            // width: 70px;
            // padding: 10px 0;
            box-sizing: border-box;
            margin: 0 6px;
            .question-title {
              color: #fff;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
              transform: scale(0.7);
              .question-icon {
                color: #fff;
                background: transparent;
              }
            }
            .question {
              color: #808080;
              .question-item {
                margin-bottom: 5px;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
                transform: scale(0.7);
              }
            }
          }
        }
        .day-pc,
        .day-mobile {
          .material-icons-round {
            color: #979cb5 !important;
            opacity: 1 !important;
          }
          .container-center {
            .input {
              .el-button {
                border-radius: 12px !important;
                .material-icons-round {
                  background: transparent !important;
                  color: #fff !important;
                }
              }
            }
          }
          .chat-content {
            .chat {
              &.server {
                span {
                  background: #f6f7fb;
                }
              }
              &.customer {
                span {
                  // background: #5082F4 !important;
                }
              }
            }
          }
        }
      }
    }
    .item-style {
      background: #d7d7d7;
      border-radius: 5px;
      padding: 10px;
      box-sizing: border-box;
      width: 400px;
      display: flex;
      justify-content: space-between;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      .day-pc {
        width: 210px;
        border-radius: 5px;
        overflow: hidden;
        .container-header {
          padding: 5px 10px;
          display: flex;
          .header-left {
            img {
              width: 18px;
              height: 18px;
              border-radius: 2px;
            }
          }
          .header-right {
            margin-left: auto;
            display: flex;
          }
        }
        .container-center {
          display: flex;
          height: 170px;
          .center-left {
            width: 120px;
            border-right: 1px solid rgb(252, 252, 252);
            &.night {
              border-right: 1px solid rgb(62, 62, 62);
            }
            .chat-content {
              height: 120px;
              padding: 10px 0;
              .chat {
                img {
                  width: 15px;
                  height: 15px;
                  border-radius: 2px;
                }
                &.server {
                  text-align: left;
                  span {
                    background: #f8f8f8;
                  }
                }
                &.customer {
                  text-align: right;
                }
                span {
                  display: inline-flex;
                  padding: 2px 5px;
                  border-radius: 5px;
                  background: #f00;
                  font-size: 12px;
                  transform: scale(0.7);
                }
              }
            }
            .input {
              height: 50px;
              position: relative;
              padding: 15px 10px;
              .input-content {
                &::after {
                  content: "";
                  position: absolute;
                  z-index: 1;
                  left: 0;
                  top: 0;
                  right: 0;
                  height: 1px;
                  background: rgba(229, 229, 229, 0.6);
                }
                &.night::after {
                  content: "";
                  position: absolute;
                  z-index: 1;
                  left: 0;
                  top: 0;
                  right: 0;
                  height: 1px;
                  background: rgba(72, 72, 72, 0.6);
                }
              }
              .menu-left__switch {
                position: absolute;
                left: 0;
                bottom: 0;
                background: none;
              }
              ::v-deep.el-button {
                position: absolute;
                right: 2px;
                bottom: 5px;
                padding: 2px 5px;
                font-size: 12px;
                transform-origin: right bottom;
                transform: scale(0.5);
                border-radius: 8px;
                display: flex;
                align-items: center;
                .material-icons-round {
                  transform-origin: center center;
                  transform: scale(0.5);
                }
              }
            }
          }
          .center-right {
            font-size: 8px;
            flex: 1;
            width: 70px;
            padding: 10px 0;
            box-sizing: border-box;
            .question-title {
              color: rgb(53, 99, 227);
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
              transform: scale(0.7);
            }
            .question {
              color: #808080;
              .question-item {
                margin-bottom: 5px;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
                transform: scale(0.7);
              }
            }
          }
        }
      }
      .day-mobile {
        width: 150px;
        border-radius: 5px;
        overflow: hidden;
        .container-header {
          padding: 5px 10px;
          display: flex;
          .header-left {
            img {
              width: 18px;
            }
          }
          .header-right {
            margin-left: auto;
            display: flex;
            .material-icons-round {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 18px;
              height: 18px;
              margin-right: 5px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.3);
              font-size: 12px;
              color: #ffffff;
            }
          }
        }
        .container-center {
          height: 170px;
          .chat-content {
            height: 120px;
            padding: 10px 0;
            .chat {
              img {
                width: 15px;
              }
              &.server {
                text-align: left;
                span {
                  background: #f8f8f8;
                }
              }
              &.customer {
                text-align: right;
              }
              span {
                display: inline-flex;
                padding: 2px 5px;
                border-radius: 5px;
                background: #f00;
                font-size: 12px;
                transform: scale(0.7);
              }
            }
          }
          .input {
            height: 50px;
            position: relative;
            padding: 15px 10px;
            .input-content {
              &::after {
                content: "";
                position: absolute;
                z-index: 1;
                left: 0;
                top: 0;
                right: 0;
                height: 1px;
                background: rgba(229, 229, 229, 0.6);
              }
              &.night::after {
                content: "";
                position: absolute;
                z-index: 1;
                left: 0;
                top: 0;
                right: 0;
                height: 1px;
                background: rgba(72, 72, 72, 0.6);
              }
            }
            .menu-left__switch {
              position: absolute;
              left: 0;
              bottom: 0;
              background: none;
            }
            ::v-deep.el-button {
              position: absolute;
              right: 2px;
              bottom: 5px;
              padding: 2px 5px;
              font-size: 12px;
              transform-origin: right bottom;
              transform: scale(0.5);
              border-radius: 8px;
              display: flex;
              align-items: center;
              .material-icons-round {
                transform-origin: center center;
                transform: scale(0.5);
              }
            }
          }
        }
      }
    }
  }
}
.promote {
  display: flex;
  margin-bottom: 10px;
  .promote-title {
    width: 82px;
    text-align: right;
    padding-right: 12px;
    box-sizing: border-box;
    // margin-right: 23%;
  }
  .promote-list {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 13px;
    // liu
    .upload-btn {
      border: 1px dashed #5082f4ff !important;
      i {
        color: #5082f4ff;
      }
    }
    .img {
      width: 100px;
      height: 100px;
      margin-right: 10px;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      .delete {
        display: none;
        position: absolute;
        z-index: 1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        background: rgba(0, 0, 0, 0.4);
        .el-icon-delete {
          margin-top: 40px;
          font-size: 16px;
          color: #fff;
        }
      }
      &:hover {
        .delete {
          display: block;
        }
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 6px;
      }
    }
    .upload-btn {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: #8c939d;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
    }
  }
}
.format {
  padding-left: 83px;
  color: #f00;
  margin: 10px 0 10px;
  letter-spacing: 1px;
}
.theme-area {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
  height: auto;
  margin-bottom: 15px;
  padding-bottom: 0;
  // box-shadow:inset 0 0 2px 2px #ccc;
  .title {
    padding-left: 15px;
  }
  .night,
  .day {
    display: flex;
    margin: 20px 0 30px;
    > div {
      padding: 0 10px;
      display: flex;
      align-items: center;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 60%;
        border-right: 1px dashed #ccc;
      }
      &:last-child:after {
        border: none;
      }
      span {
        white-space: nowrap;
        margin-right: 10px;
      }
    }
  }
}
</style>
