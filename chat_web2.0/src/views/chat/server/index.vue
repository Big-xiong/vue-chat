<template>
  <div v-loading="isShowLoading" class="server">
    <server-side v-if="!isMobile" @openWs="initWebSocket" @clickSession="clickSession" />

    <div class="server-main">
      <server-header @logout="logoutHandler" @clickPlatform="clickPlatform" @changePlatform="changePlatform" />
      <div class="server-main__body">
        <div :class="['wrap-content', {'wrap-list-height': left === 0}]" :style="{left:left + 'px'}" @touchstart.stop="handleTouch" @touchmove.stop="handleTouchMove">
          <!-- 左边访客列表 -->
          <div class="customer-wrap">
            <div style="display:flex;height:100%;">
              <server-side v-if="isMobile" :left="left" @clickSession="clickSession" />
              <div class="customer-wrap__header">
                <span v-show="sessionActive === 'current'">{{ $t('chatServer.sessionOptions[0]') }}</span>
                <span v-show="sessionActive === 'history'">{{ $t('chatServer.sessionOptions[1]') }}</span>
                <span v-show="sessionActive === 'waiting'">{{ $t('chatServer.sessionOptions[2]') }}</span>
              </div>
              <div id="customer-list" class="customer-list">
                <div v-for="(customer,index) in customerList" :key="index" :class="['customer-item',{ 'active': customer.customer_id == activeCustomer.customer_id }, { 'offline': customer.offline || serverStatus == 'offline' }]" @click="clickCustomer(customer)">
                  <div class="customer-item-top">
                    <div class="customer-avatar-wrap">
                      <img class="avatar" :src="customer.customer_avatar">
                      <svg-icon v-if="customer.system" :icon-class="`session_${[judgeDevice(customer)]}`" />
                    </div>
                    <div class="name-box">
                      <div class="name"> <span>{{ customer.customer_name }}</span> <div class="time">{{ dateformat(customer.create_time) }}</div> </div>
                      <div class="shortContent">
                        <span class="ellipsis shortContent-text" v-html="customer.shortContent"></span>
                        <span v-show="customer.newFlag || customer.unreadCount" :class="['badge', {'char': customer.newFlag}]">
                          <template v-if="customer.newFlag">new</template>
                          <template v-else-if="customer.unreadCount">{{ customer.unreadCount>99? 99:customer.unreadCount }}</template>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div v-show="customer.remark" class="customer-item-bottom">
                    <svg-icon icon-class="editor" class="mr6" />
                    <span>{{ customer.remark }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 中间对话框 -->
          <div v-loading="msgloading" class="chat-wrap">
            <div :class="['chat-wrap__head', {'hide-chat': activeSessionType !== 'current'}]">
              <div v-if="activeSessionType=='current'" class="flex-jcsb-aic">
                <div class="flex-aic">
                  <span class="option-item" @click="openTransfer">
                    <svg-icon icon-class="swap_horiz" /><span class="option-item-txt">{{ $t('chatServer.curSesActions[0]') }}</span>
                  </span>
                  <span class="option-item" @click="inviteServerHandler">
                    <svg-icon icon-class="call_split" /><span class="option-item-txt">{{ $t('chatServer.curSesActions[3]') }}</span>
                  </span>
                  <span class="option-item" @click="removeSession">
                    <svg-icon icon-class="highlight_off" /><span class="option-item-txt">{{ $t('chatServer.curSesActions[1]') }}</span>
                  </span>
                  <span class="option-item" @click="sessionVisible=true">
                    <svg-icon icon-class="rule" /><span class="option-item-txt">{{ $t('chatServer.curSesActions[2]') }}</span>
                  </span>
                  <span class="option-item" @click="clearOfflineSession()">
                    <svg-icon icon-class="delete" /><span class="option-item-txt">{{ $t('chatServer.curSesActions[4]') }}</span>
                  </span>
                </div>
                <el-dropdown trigger="click" placement="top" class="lang-item-dropdown" @command="changeLang">
                  <div class="lang-item">
                    <span class="mr2">{{ curLang === 'close' ? $t('contextmenu.closeTranslate') :langMap[curLang].lang }}
                      <svg-icon icon-class="chat_lang" />
                    </span>
                  </div>
                  <el-dropdown-menu slot="dropdown" class="lang-dropdown">
                    <el-dropdown-item command="close">
                      <div class="lang-item">
                        {{ $t('contextmenu.closeTranslate') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="zh">
                      <div class="lang-item">
                        {{ $t('navbar.zh') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="en">
                      <div class="lang-item">
                        {{ $t('navbar.en') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="vi">
                      <div class="lang-item">
                        {{ $t('navbar.vi') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="th">
                      <div class="lang-item">
                        {{ $t('navbar.th') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="es">
                      <div class="lang-item">
                        {{ $t('navbar.es') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="pt">
                      <div class="lang-item">
                        {{ $t('navbar.pt') }}
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item command="ms">
                      <div class="lang-item">
                        {{ $t('navbar.ms') }}
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- <el-popover width="200" trigger="hover" popper-class="copy-reference" :content="$t('chatServer.screenshot[0]')">
                  <el-button slot="reference">{{ $t('chatServer.screenshot[1]') }}</el-button>
                </el-popover> -->
                <!-- 会话设置弹框 -->
                <el-dialog class="session-dialog" :title="$t('chatServer.curSesDialog.title')" width="350px" :visible.sync="sessionVisible" :close-on-click-modal="true">
                  <el-radio-group v-model="sessionOrder">
                    <el-radio label="2">{{ $t('chatServer.curSesDialog.options[1]') }}</el-radio>
                    <el-radio label="1">{{ $t('chatServer.curSesDialog.options[0]') }}</el-radio>
                  </el-radio-group>
                  <el-radio-group v-model="sessionFinsh">
                    <el-radio label="1">{{ $t('chatServer.curSesDialog.options[2]') }}</el-radio>
                    <el-radio label="2">{{ $t('chatServer.curSesDialog.options[3]') }}</el-radio>
                  </el-radio-group>
                  <!--<el-checkbox v-model="isall" true-label="1" false-label="0">{{ $t('chatServer.curSesDialog.showAll') }}</el-checkbox>-->
                  <span slot="footer" class="dialog-footer">
                    <!-- Btn 清理结束会话 -->
                    <!--<el-button size="medium" @click="clearOfflineSession()">
											{{ $t('chatServer.curSesDialog.footer[0]') }}
										</el-button>-->
                    <el-button size="medium" type="primary" @click="updateSessionConfig">{{ $t('chatServer.curSesDialog.footer[1]') }}</el-button>
                  </span>
                </el-dialog>
              </div>
              <template v-else-if="activeSessionType=='waiting'">
                <span class="option-item" @click="clickReceiveVisitor"><i class="material-icons-round" style="fontSize:17px">pending</i>{{ $t('chatServer.hisSesActions[0]') }}</span>
              </template>
            </div>
            <chat-content />
            <input-menu ref="inputMenu" />
          </div>
          <!-- 右边用户信息 -->
          <div class="words-wrap">
            <el-tabs v-model="activeTab">
              <el-tab-pane :label="$t('chatServer.userInfo.title')" name="userInfo">
                <ul>
                  <li :class="{'active': activeLi === 1}" @click="handleLi(1)">
                    {{ $t('chatServer.userInfo.visit.title') }}
                    <svg-icon icon-class="client_arrow" :class-name="isOpenUserInfo === '1' ? 'arrow-down' : 'arrow-up'" @click="collapseUserInfo()" />
                  </li>
                  <li :class="{'active': activeLi === 2}" @click="handleLi(2)">{{ $t('chatServer.userInfo.card.title') }}</li>
                  <!-- <li :class="{'active': activeLi === 3}" @click="handleLi(3)">{{ $t('chatServer.userInfo.mark.title') }}</li> -->
                  <li :class="{'active': activeLi === 4}" @click="handleLi(4)">{{ $t('chatServer.userInfo.other.title') }}</li>
                </ul>
                <div v-if="activeLi === 1 && isOpenUserInfo === '1'" class="info-item">
                  <!-- <div class="info-item__header">{{ $t('chatServer.userInfo.visit.title') }}</div> -->
                  <div class="info-item__body card">
                    <div>
                      <div>
                        {{ $t('chatServer.userInfo.visit.source') }}
                        <p>{{ customerDetail.search_engines }}</p>
                      </div>
                      <div>
                        {{ $t('chatServer.userInfo.visit.link') }}
                        <p>{{ customerDetail.from_url }}</p>
                      </div>
                      <div>
                        {{ $t('chatServer.userInfo.visit.ip') }}
                        <p>{{ activeCustomer.customer_ip || customerDetail.ip }}</p>
                      </div>
                      <div>
                        {{ $t('chatServer.userInfo.visit.addr') }}
                        <p>{{ customerDetail.City }}</p>
                      </div>
                      <div>
                        {{ $t('chatServer.userInfo.visit.device') }}
                        <p>{{ judgeDeviceHandle(customerDetail) }}-{{ customerDetail.browser }}</p>
                      </div>
                      <div>
                        {{ $t('chatServer.userInfo.visit.system') }}
                        <p>{{ customerDetail.system }}</p>
                      </div>
                      <div v-if="customerDetail.chip">
                        {{ $t('chatServer.userInfo.visit.chip') }}
                        <p>{{ customerDetail.chip }}</p>
                      </div>
                      <div v-if="customerDetail.usdt">
                        {{ $t('chatServer.userInfo.visit.usdt') }}
                        <p>{{ customerDetail.usdt }}</p>
                      </div>
                      <div v-if="customerDetail.ctime">
                        {{ $t('chatServer.userInfo.visit.ctime') }}
                        <p>{{ customerDetail.ctime }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activeLi === 2" class="info-item">
                  <!-- <div class="info-item__header">{{ $t('chatServer.userInfo.card.title') }}</div> -->
                  <div class="info-item__body card">
                    <div>
                      <div v-if="customerDetail.real_name">{{ $t('chatServer.userInfo.card.name') }}{{ customerDetail.real_name }}</div>
                      <div class="flex-aic">{{ $t('chatServer.userInfo.card.customerName') }}
                        <el-input v-model="customerName" clearable style="flex:1" :placeholder="$t('chatServer.userInfo.card.placeholder')" @blur="updateCustomerName" />
                      </div>
                      <div class="flex-aic">{{ $t('chatServer.userInfo.card.email') }}
                        <el-input v-model="email" style="flex:1" :placeholder="$t('chatServer.userInfo.card.placeholder')" @blur="updateCustomer" />
                      </div>
                      <div class="flex-aic">
                        {{ $t('chatServer.userInfo.card.phone') }}
                        <el-input v-model="phone" style="flex:1" :placeholder="$t('chatServer.userInfo.card.placeholder')" @blur="updateCustomer" />
                        <a v-if="/^[1][3,4,5,7,8,9][0-9]{9}$/.test(customerDetail.phone)" :href="`skype:${customerDetail.phone}`">
                          <i class="iconfont icon-skype" />
                        </a>
                      </div>
                      <div v-if="customerDetail.address">{{ $t('chatServer.userInfo.card.address') }}{{ customerDetail.address }}</div>
                      <div v-if="customerDetail.age">{{ $t('chatServer.userInfo.card.age') }}{{ customerDetail.age }}</div>
                      <div v-if="customerDetail.comment">{{ $t('chatServer.userInfo.card.comment') }}{{ customerDetail.comment }}</div>
                      <div v-if="customerDetail.gender">{{ $t('chatServer.userInfo.card.gender') }}{{ customerDetail.gender }}</div>
                      <div v-if="customerDetail.qq">{{ $t('chatServer.userInfo.card.qq') }}{{ customerDetail.qq }}</div>
                      <div v-if="customerDetail.weibo">{{ $t('chatServer.userInfo.card.weibo') }}{{ customerDetail.weibo }}</div>
                      <div v-if="customerDetail.weixin">{{ $t('chatServer.userInfo.card.weixin') }}{{ customerDetail.weixin }}</div>
                      <div v-if="customerDetail.isming">{{ $t('chatServer.userInfo.card.isming') }}{{ customerDetail.isming }}</div>
                      <div class="info-item__body clearTextArea mb0">
                        {{ $t('chatServer.userInfo.mark.title') }}：
                        <el-input v-model="remark" :placeholder="$t('chatServer.userInfo.mark.placeholder')" type="textarea" :rows="4" @blur="updateCustomer" />
                        <i v-show="remark" style="position:absolute;right:3px;bottom:3px;" class="clearButton el-input__icon el-icon-circle-close el-input__clear" @click.prevent="clearRemark" />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activeLi === 3" class="info-item">
                  <!-- <div class="info-item__header">{{ $t('chatServer.userInfo.mark.title') }}</div> -->
                  <div class="info-item__body clearTextArea">
                    <el-input v-model="remark" :placeholder="$t('chatServer.userInfo.mark.placeholder')" type="textarea" :rows="4" @blur="updateCustomer" />
                    <i v-show="remark" style="position:absolute;right:3px;bottom:3px;" class="clearButton el-input__icon el-icon-circle-close el-input__clear" @click.prevent="clearRemark" />
                  </div>
                </div>
                <div v-if="activeLi === 4" class="info-item">
                  <!-- <div class="info-item__header">{{ $t('chatServer.userInfo.other.title') }}</div> -->
                  <div class="info-item__body">
                    <div v-if="activeSessionType!='waiting'" class="join-blacklist" @click="addBlockList"><i class="material-icons-round fs-16 mr6">do_disturb</i>{{ $t('chatServer.userInfo.other.addBlack.title') }}</div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('chatServer.commonWords.title')" name="commonWords" class="common-words">
                <el-collapse>
                  <el-collapse-item v-for="dailyWord in dailyWordList" :key="dailyWord.type" :title="dailyWord.type">
                    <div>
                      <div v-for="(word,index) in dailyWord.children" :key="index">
                        <div v-if="!isMobile" class="coll-content">
                          <el-popover ref="wordPopper" popper-class="popover-popper" placement="bottom" trigger="hover">
                            <div class="content">
                              <!-- <div v-for="(item,index) in word.content.split('\n')" :key="index">{{ item }}</div> -->
                              <div v-html="unescape(word.content).replace(/\\/g, '')"></div>
                            </div>
                            <div slot="reference" class="reference">
                              <svg-icon icon-class="send_gray" />{{ word.title }}
                            </div>
                          </el-popover>
                          <div class="send-btn" @click="wordClick(word.content)">
                            <svg-icon icon-class="send" />{{ $t('chatServer.commonWords.send') }}
                          </div>
                        </div>
                        <div v-else class="coll-content">
                          <el-popover ref="wordPopper" popper-class="popover-popper" placement="bottom" trigger="click">
                            <div class="content">
                              <div v-html="unescape(word.content).replace(/\\/g, '')"></div>
                              <!-- <div v-for="(item,index) in word.content.split('\n')" :key="index">{{ item }}</div> -->
                            </div>
                            <div slot="reference" class="reference">
                              <svg-icon icon-class="send_gray" />{{ word.title }}
                            </div>
                          </el-popover>
                          <div class="send-btn" @click="wordClick(word.content)">
                            <svg-icon icon-class="send" />{{ $t('chatServer.commonWords.send') }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-tab-pane>
              <el-tab-pane :label="$t('chatServer.customSetLabel')" name="customizeWords" class="common-words">
                <div class="setting-title">
                  <el-button style="margin-bottom:10px;" @click="openWordSetDialog">{{ $t('chatServer.customizeWords.button[0]') }}</el-button>
                  <el-button style="margin-bottom:10px;" @click="openHelloWord">{{ $t('chatServer.editHello.entry') }}</el-button>
                  <el-button style="margin-bottom:10px;" @click="openSoundDialog">{{ $t('sound.entry') }}</el-button>
                </div>
                <el-collapse>
                  <el-collapse-item v-for="dailyWord in dailyWordListCustom" :key="dailyWord.type" :title="dailyWord.type">
                    <div>
                      <div v-for="(word,index) in dailyWord.children" :key="index">
                        <div v-if="!isMobile" class="coll-content">
                          <el-popover ref="wordPopper" popper-class="popover-popper" placement="bottom" trigger="hover">
                            <div v-for="(item,index) in word.content.split('\n')" :key="index">{{ item }}</div>
                            <div slot="reference" class="reference">
                              <svg-icon icon-class="send_gray" />
                              <p>{{ word.title }}</p>
                            </div>
                          </el-popover>
                          <div class="send-btn" @click="wordClick(word.content)">
                            <svg-icon icon-class="send" />{{ $t('chatServer.commonWords.send') }}
                          </div>
                        </div>
                        <div v-else class="coll-content">
                          <el-popover ref="wordPopper" popper-class="popover-popper" placement="bottom" trigger="click">
                            <div class="content">
                              <div v-for="(item,index) in word.content.split('\n')" :key="index">{{ item }}</div>
                            </div>
                            <div slot="reference" class="reference">
                              <svg-icon icon-class="send_gray" />
                              <p>{{ word.title }}</p>
                            </div>
                          </el-popover>
                          <div class="send-btn" @click="wordClick(word.content)">
                            <svg-icon icon-class="send" />{{ $t('chatServer.commonWords.send') }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
    <!-- 自定义常用语弹窗 -->
    <el-dialog :visible="wordsVisible" class="set-dialog" :close-on-click-modal="true" :title="$t('chatServer.customizeWords.button[2]')" width="800px" @close="wordsVisible = false;getDailyWordCustom()">
      <!-- 分类表格 -->
      <el-button class="mb10" type="primary" @click="openTypeDialog('add')">{{ $t('chatServer.customizeWords.button[1]') }}</el-button>
      <el-table :data="wordTypeList" stripe>
        <el-table-column prop="cate_id" :label="$t('dailyWordType.table.id')" align="center" />
        <el-table-column prop="cate_name" :label="$t('dailyWordType.table.name')" align="center" />
        <el-table-column :label="$t('dailyWordType.table.status')" align="center">
          <el-tag slot-scope="{row}" :type="row.status==1 ? '' : 'info'">{{ row.status==1 ? $t('dailyWordType.table.active') : $t('dailyWordType.table.unActive') }}</el-tag>
        </el-table-column>
        <el-table-column :label="$t('action.label')" align="center" width="180">
          <template slot-scope="{row}">
            <el-button v-waves size="mini" type="primary" @click="openTypeDialog('edit',row)">
              <i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
            </el-button>
            <el-button v-waves size="mini" type="danger" @click="deleteDailyType(row)">
              <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="typeTotal" :page.sync="typePage" :limit="typeLimit" :layout="'total, prev, pager, next, jumper'" @pagination="getWordTypeListCustom" />
      <!-- 常用语表格 -->
      <el-button class="mb10" type="primary" @click="openWordDialog('add')">{{ $t('chatServer.customizeWords.button[2]') }}</el-button>
      <el-table :data="cusDailyWordList" stripe>
        <el-table-column prop="word_id" :label="$t('dailyWord.table.id')" align="center" />
        <el-table-column prop="title" :label="$t('dailyWord.table.title')" align="center" />
        <el-table-column prop="word" :label="$t('dailyWord.table.word')" align="center">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.word.split('\n')" :key="index">{{ item }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" :label="$t('dailyWord.table.type')" align="center" />
        <!-- <el-table-column prop="create_time" :label="$t('dailyWord.table.createTime')" width="170" align="center" />-->
        <!-- <el-table-column prop="update_time" :label="$t('dailyWord.table.updateTime')" width="170" align="center" /> -->
        <el-table-column :label="$t('action.label')" align="center" width="180">
          <template slot-scope="{row}">
            <el-button v-waves size="mini" type="primary" @click="openWordDialog('edit',row)">
              <i class="material-icons-round fs-14 mr6">drive_file_rename_outline</i>{{ $t('action.type.edit') }}
            </el-button>
            <el-button v-waves size="mini" type="danger" @click="deleteDailyWord(row)">
              <i class="material-icons-round fs-14 mr6">delete_outline</i>{{ $t('action.type.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="page" :limit="limit" :layout="'total, prev, pager, next, jumper'" @pagination="getDailyWordListCustom" />
      <span slot="footer">
        <el-button type="primary" @click="wordsVisible = false;getDailyWordCustom()">{{ $t('chatServer.customizeWords.button[3]') }}</el-button>
      </span>
    </el-dialog>
    <!-- 添加分类的弹窗 -->
    <type-dialog v-bind="typeDialog" class="set-dialog" @visibleChange="typeDialog.visible = $event" @reloadWordTypeList="getWordTypeListCustom" />
    <!-- 添加编辑常用语的弹窗 -->
    <word-dialog v-bind="wordDialog" class="set-dialog" @visibleChange="wordDialog.visible = $event" @reloadDailyWordList="getDailyWordListCustom" />
    <!-- 提示音设置 -->
    <sound-dialog ref="soundDialog" />
    <!-- 转接会话弹窗 -->
    <transfer-server :visible.sync="transferVisible" />

    <!-- 邀请加入会话弹窗 -->
    <invite-server :visible.sync="inviteServer.visible" :platform-id="inviteServer.platformId" />
    <!-- 自定义常用语弹窗 -->
    <el-dialog :visible="helloWordVisible" class="set-helloword" :close-on-click-modal="true" :title="$t('chatServer.editHello.title')" width="800px" @close="helloWordVisible = false">
      <div class="enable" style="display: flex;align-items: center;margin-bottom: 20px;">
        <el-switch v-model="KfConfig.isEnable" active-value="1" inactive-value="0" style="margin-right:10px;" />
        <span>{{ $t('chatServer.editHello.button[0]') }}</span>
      </div>
      <el-input v-model="KfConfig.hello_word" :placeholder="$t('chatServer.editHello.placeholder')" type="textarea" :rows="4" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setKfHelloWord">{{ $t('chatServer.editHello.button[1]') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { eventBus } from './eventBus.js'
import inputMenu from './inputMenu.vue'
import serverSide from './serverSide.vue'
import chatContent from './chatContent.vue'
import serverHeader from './serverHeader.vue'
import inviteServer from './inviteServer.vue'
import transferServer from './transferServer.vue'
import typeDialog from './typeDialog.vue'
import wordDialog from './wordDialog.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getSellerInfo, getCustomerList, getCustomerDetail, addBlockList, updateCustomer, updateCustomerName, getDailyWordList, getHelloWorld, setHelloWorld, getChatList } from '@/api/chatServer.js'
import { getWordTypeListCustom, deleteDailyTypeCustom, getDailyWordListCustom, deleteDailyWordCustom } from '@/api/dailyWord.js'
import { parseTime } from '@/utils'
import soundDialog from './soundDialog.vue'
import { unescape } from 'html-escaper'
import { extractImage } from '@/utils/chat.js'

export default {
  name: 'ChatServer',
  components: {
    serverSide,
    chatContent,
    inputMenu,
    serverHeader,
    inviteServer,
    transferServer,
    typeDialog,
    wordDialog,
    soundDialog
  },
  filters: {

  },
  data() {
    return {
      socketTimer: null,
      wsUrl: '',
      eventBus,
      email: '',
      customerName: '',
      phone: '',
      remark: '',
      heartBeat: null,
      dailyWordList: [],
      wordsVisible: false,
      helloWordVisible: false,
      dailyWordListCustom: [],
      transferVisible: false,
      activeTab: 'userInfo',
      activeLi: 1,
      isOpenUserInfo: localStorageCompatible.getItem('isOpenUserInfo') || '1',
      currentCustomerList: [],
      historyCustomerList: [],
      waitingCustomerList: [],
      comeInCustomerList: JSON.parse(localStorageCompatible.getItem('comeInCustomerList')) || [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      sessionVisible: false,
      inviteServer: {
        visible: false,
        platformId: ''
      },
      domain_id: '',
      domain_title: '',
      revitationList: [],
      sideShow: false,
      sX: undefined,
      sY: undefined,
      left: 0,
      timeout: null,
      sessionActive: 'current',
      isall: localStorageCompatible.getItem('isall') || '1',
      sessionOrder: localStorageCompatible.getItem('sessionOrder') || '2',
      sessionFinsh: localStorageCompatible.getItem('sessionFinsh') || '1',
      // 分类
      typePage: 1,
      typeLimit: 5,
      typeTotal: 0,
      wordTypeList: [],
      typeDialog: {
        type: '',
        title: '',
        visible: false,
        typeDetail: {}
      },
      // 常用语
      wordVisible: false,
      page: 1,
      limit: 5,
      total: 0,
      cusDailyWordList: [],
      wordDialog: {
        type: '',
        title: '',
        visible: false,
        wordDetail: {}
      },
      cardInfo: {},
      curLang: 'close',
      langMap: {
        zh: {
          lang: this.$t('navbar.zh'),
          key: 'zh-cn'
        },
        en: {
          lang: this.$t('navbar.en'),
          key: 'en'
        },
        vi: {
          lang: this.$t('navbar.vi'),
          key: 'vi'
        },
        th: {
          lang: this.$t('navbar.th'),
          key: 'th'
        },
        es: {
          lang: this.$t('navbar.es'),
          key: 'es'
        },
        pt: {
          lang: this.$t('navbar.pt'),
          key: 'pt'
        },
        ms: {
          lang: this.$t('navbar.ms'),
          key: 'ms'
        }
      },
      KfConfig: {},
      isShowLoading: true,
      msgloading: false
    }
  },
  watch: {
    customerList: {
      handler(v) {
        v.map(m => m.icon = this.judgeDevice(v))
        if (v) {
          eventBus.$emit('setCustomer', v)
        } else {
          eventBus.$emit('setCustomer', [])
        }
      },
      deep: true
    },
    wsMsg(v) {
      const { cmd, data } = v
      console.log("wsMsg -> cmd", cmd,data)
      switch (cmd) {
        // 聊天消息
        case 'chatMessage':
          this.isShowLoading = false
          this.receiveMsgHandler(data, 'chatMessage')
          break

        // 访客接入
        case 'customerLink':
          this.comeInCustomerHandler(data)
          break

        // 接待访客成功与否反馈
        case 'linkKFCB':
          this.receiveVisitorHandler(data)
          break

        // 访客离线
        case 'offline':
          this.offlineHandler(data)
          break

        // 转接结果
        case 'changeGroupCB':
          this.transferHandler(data)
          break

        // 接受转接
        case 'reLink':
          this.reLinkHanlder(data)
          break

        // 客服离线提供可转接客服
        case 'kfrelink':
          this.autoTransferHandler(v)
          break

        // 商户端下线客服
        case 'kfOFF':
          this.beOfflineHandler()
          break

        // 收到会话邀请
        case 'InvitationKf':
          this.receiveSessionHandler(data)
          break

        // 群组建立反馈
        case 'groupALL':
          this.groupALLHandler(data)
          break

        // 群组关闭反馈
        case 'groupMessage':
          this.closeGroupCallback(data)
          break

        // 收到取消邀请
        case 'Disinvite':
          this.$msgbox.close()
          break

        default:
          this.isShowLoading = false
          break
      }
    },
    async activeSession() {
      await this.getCustomerList()
      const { customerList } = this
      if (customerList.length) {
        const w = document.body.clientWidth

        if (w > 600) {
          this.clickCustomer(customerList[0])
        }
      } else {
        this.setActiveCustomer({})
      }
    },
    // activeCustomer(v) {
    //   delete v.shortContent
    // },
    domain_id: {
      handler(v) {
        if (v) {
          this.getDailyWordList(v)
        }
      },
      immediate: true
    },
    currentCustomerList: {
      handler(v) {
        // 找到当前选中访客
        const index = v.findIndex(customer => {
          return customer.customer_id == this.activeCustomer.customer_id
        })
        if (index != -1) {
          const { offline } = this.currentCustomerList[index]
          this.$set(this.activeCustomer, 'offline', offline)
        }
        this.setCurrentCustomer(v)
      },
      immediate: true,
      deep: true
    },
    serverStatus(v) {
      if (v == 'offline') {
        for (let index = 0; index < this.currentCustomerList.length; index++) {
          const customer = this.currentCustomerList[index]
          const {
            customer_id,
            search_engines
          } = customer
          this.setLastTime({
            customer_id,
            search_engines,
            time: parseTime(new Date())
          })
        }
      }
    }
  },
  computed: {
    ...mapState({
      ws: state => state.chatServer.ws,
      wsMsg: state => state.chatServer.wsMsg,
      activeSession: state => state.chatServer.activeSession,
      activeCustomer: state => state.chatServer.activeCustomer,
      activePlatform: state => state.chatServer.activePlatform,
      activeState: state => state.chatServer.activeState,
      platformList: state => state.chatServer.platformList,
      customerDetail: state => state.chatServer.customerDetail,
      server: state => state.auth.server,
      serverStatus: state => state.chatServer.serverStatus
    }),
    ...mapGetters('chatServer', ['activeSessionType', 'offlineCustomerList', 'lastTime']),
    ...mapGetters('app', ['theme']),
    customerList() {
      // 离线访客排后面
      const data = this.currentCustomerList
      data.sort((a, b) => (!b.offline ?? false) - (!a.offline ?? false))
      return {
        current: data,
        history: this.historyCustomerList,
        waiting: this.waitingCustomerList
      }[this.activeSessionType]
    },
    customerUrl() {
      return {
        current: '/service/getisNowServiceList',
        history: '/service/getHistoryChatList',
        waiting: '/service/getCustomerQueue'
      }[this.activeSessionType]
    },
    // 判断是否在移动端
    isMobile() {
      const info = navigator.userAgent
      const agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPod',
        'iPad'
      ]
      for (let i = 0; i < agents.length; i++) {
        if (info.indexOf(agents[i]) >= 0) return true
      }
      return false
    }
  },
  methods: {
    unescape,
    // 判断设备类型
    judgeDeviceHandle(customer) {
      if (!customer.system) {
        return
      }
      if (customer.system.includes('iOS')) {
        return 'iphone'
      } else if (customer.system.includes('mac')) {
        return 'mac'
      } else if (customer.system.includes('Windows')) {
        return 'pc'
      } else if (customer.system.includes('Android')) {
        return 'android'
      }
    },
    // 判断设备类型
    judgeDevice(customer) {
      if (!customer.system) {
        return
      }
      if (customer.system.includes('iOS')) {
        return 'ios'
      } else if (customer.system.includes('mac')) {
        return 'mac'
      } else if (customer.system.includes('Windows')) {
        return 'win'
      } else if (customer.system.includes('Android')) {
        return 'android'
      }
    },
    // 设置翻译语言
    changeLang(lang) {
      this.curLang = lang
      this.setChatLang(this.curLang)
      window.localStorage.setItem('chat-server-lang', lang)
    },
    // 打开常用语设置
    openWordSetDialog() {
      this.wordsVisible = !this.wordsVisible
      this.getWordTypeListCustom() // 分类列表
      this.getDailyWordListCustom() // 常用语列表
    },
    // 打开欢迎语编辑
    openHelloWord() {
      if (!this.helloWordVisible) {
        getHelloWorld().then(res => {
          const { code, data, msg } = res
          if (code == 0) {
            this.KfConfig = {
              hello_word: data.hello_word,
              isEnable: data.isEnable
            }
            this.helloWordVisible = true
          } else {
            this.$message.error(msg)
          }
        })
      } else {
        this.helloWordVisible = false
      }
    },
    // 打开提示音编辑
    openSoundDialog() {
      const params = {
        sound: this.server.sound
      }
      this.$refs.soundDialog.show(params)
    },
    setKfHelloWord() {
      const {
        hello_word,
        isEnable
      } = this.KfConfig
      setHelloWorld({ hello_word, isEnable }).then(res => {
        const success = res.code === 0
        this.$notify({
          title: success ? this.$t('notify.success') : this.$t('notify.fail'),
          type: success ? 'success' : 'error',
          message: success ? this.$t('chatServer.userInfo.update.success') : this.$t('chatServer.userInfo.update.fail')
        })
        if (success) {
          this.helloWordVisible = false
        }
      })
    },
    // 获取分类
    getWordTypeListCustom() {
      const { typePage: page, typeLimit: limit } = this
      getWordTypeListCustom({ page, limit }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.typeTotal = count
          this.wordTypeList = data
        }
      })
    },
    // 新增编辑分类
    openTypeDialog(dialogType, wordType = {}) {
      const { cate_id: id, cate_name: name, status } = wordType
      this.typeDialog = {
        type: dialogType,
        visible: true,
        title: dialogType == 'edit' ? this.$t('dailyWordType.form.editTitle') : this.$t('dailyWordType.form.addTitle'),
        typeDetail: dialogType == 'edit' ? { id, name, status } : { id: undefined, name: '', status: 1 }
      }
    },
    // 删除常用语分类
    deleteDailyType(row) {
      const h = this.$createElement
      this.$confirm(this.$t('dailyWordType.delete.message'), this.$t('dailyWordType.delete.tips'), {
        confirmButtonText: this.$t('dailyWordType.delete.confirm'),
        cancelButtonText: this.$t('dailyWordType.delete.cancel'),
        dangerouslyUseHTMLString: true,
        message: h('p', [
          h('svg-icon', {
            props: {
              iconClass: 'warning'
            }
          }),
          h('span', this.$t('dailyWordType.delete.message'))
        ])
      }).then(() => {
        deleteDailyTypeCustom({
          cate_id: row.cate_id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.typePage > 1 && this.wordTypeList.length === 1) {
              this.typePage--
            }
            this.getWordTypeListCustom()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
        })
      })
    },
    // 获取常用语列表
    getDailyWordListCustom() {
      const { page, limit } = this
      getDailyWordListCustom({ page, limit }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.total = count
          this.cusDailyWordList = data
        }
      })
    },
    // 新增编辑常用语
    openWordDialog(dialogType, word = {}) {
      const { word_id: id, cate_id: type, title, word: content } = word
      this.wordDialog = {
        type: dialogType,
        visible: true,
        title: dialogType == 'edit' ? this.$t('dailyWord.form.editTitle') : this.$t('dailyWord.form.addTitle'),
        wordDetail: dialogType == 'edit' ? { id, type, title, content } : { id: undefined, type: '', title: '', content: '' }
      }
    },
    // 删除常用语
    deleteDailyWord(row) {
      this.$confirm(this.$t('dailyWordType.delete.message'), this.$t('dailyWordType.delete.tips'), {
        confirmButtonText: this.$t('dailyWordType.delete.confirm'),
        cancelButtonText: this.$t('dailyWordType.delete.cancel'),
        dangerouslyUseHTMLString: true
      }).then(() => {
        deleteDailyWordCustom({
          word_id: row.word_id
        }).then(res => {
          const { code, msg } = res
          const success = code === 0
          if (success) {
            if (this.page > 1 && this.dailyWordList.length === 1) {
              this.page--
            }
            this.getDailyWordListCustom()
          }
          this.$notify({
            message: msg,
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error'
          })
        })
      })
    },
    // 公用常用语
    getDailyWordList(domain_id) {
      getDailyWordList({ domain_id }).then(res => {
        const { code, data } = res
        if (code === 0) {
          const dailyWordList = []
          if (data.length) {
            dailyWordList.push({
              type: data[0].cate_name,
              children: [
                {
                  title: data[0].title,
                  content: data[0].word
                }
              ]
            })

            for (let i = 1; i < data.length; i++) {
              const same = dailyWordList.find(
                word => data[i].cate_name == word.type
              )
              if (same) {
                same.children.push({
                  title: data[i].title,
                  content: data[i].word
                })
              } else {
                dailyWordList.push({
                  type: data[i].cate_name,
                  children: [
                    {
                      title: data[i].title,
                      content: data[i].word
                    }
                  ]
                })
              }
            }
          }
          this.dailyWordList = dailyWordList
        }
      })
    },
    // 自定义常用语
    getDailyWordCustom() {
      const params = {
        page: 1,
        limit: 1000
      }
      getDailyWordListCustom(params).then(res => {
        const { code, data } = res
        if (code === 0) {
          const dailyWordList = []
          if (data.length) {
            dailyWordList.push({
              type: data[0].cate_name,
              children: [
                {
                  title: data[0].title,
                  content: data[0].word
                }
              ]
            })
            for (let i = 1; i < data.length; i++) {
              const same = dailyWordList.find(
                word => data[i].cate_name == word.type
              )
              if (same) {
                same.children.push({
                  title: data[i].title,
                  content: data[i].word
                })
              } else {
                dailyWordList.push({
                  type: data[i].cate_name,
                  children: [
                    {
                      title: data[i].title,
                      content: data[i].word
                    }
                  ]
                })
              }
            }
          }
          this.dailyWordListCustom = dailyWordList
        }
      })
    },
    // 切换平台
    changePlatform(platform) {
      this.domain_id = platform.domain_id
      this.domain_title = platform.domain_title
    },
    // 移动端手指放下事件
    handleTouch($event) {
      if ($event.touches.length && $event.touches.length == 1) {
        this.sX = $event.touches[0].pageX
        this.sY = $event.touches[0].pageY
      }
    },
    // 移动端切屏滚动效果
    handleTouchMove($event) {
      const screenW = document.documentElement.clientWidth
      const oldX = this.sX
      const oldY = this.sY
      let endX
      let endY
      if ($event.touches.length && $event.touches.length == 1) {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          endX = $event.touches[0].pageX
          endY = $event.touches[0].pageY
          const offsetX = endX - oldX
          const offsetY = endY - oldY
          if (Math.abs(offsetY) < Math.abs(offsetX)) {
            this.moveTouch(endX, oldX, screenW)
          } else {
          }
        }, 50)
      }
    },
    // 判别左右滑动
    moveTouch(endX, oldX, screenW) {
      // 右滑
      if (endX - oldX > 5) {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        // 弹窗消失
        this.$refs.inputMenu.emojiVisible = false
        this.$refs.inputMenu.customEmojiVisible = false
        this.$refs.wordPopper.forEach(item => {
          item.showPopper = false
        })
        this.timeout = setTimeout(() => {
          if (this.left + screenW > 0) {
            this.left = 0
          } else {
            this.left += screenW
          }
        }, 1)
      }
      // 左滑
      if (endX - oldX < -5) {
        if (this.left > 0 - 2 * screenW) {
          if (this.timeout) {
            clearTimeout(this.timeout)
          }
          // 弹窗消失
          this.$refs.inputMenu.emojiVisible = false
          this.$refs.inputMenu.customEmojiVisible = false
          this.$refs.wordPopper.forEach(item => {
            item.showPopper = false
          })
          this.timeout = setTimeout(() => {
            this.left -= screenW
          }, 1)
        }
      }
    },
    // 移动端的切换当前历史待接会话
    clickSession(value) {
      this.sessionActive = value
      // this.left = 0
    },
    // 移动端的切换会话平台
    clickPlatform() {
      this.left = 0
    },
    getSellerInfo() {
      const sellerCode = this.server.seller_code
      getSellerInfo({ sellerCode }).then(res => {
        const { code, data } = res
        if (code === 0) {
          this.wsUrl = data.socket + '/websocket'
          this.initWebSocket(true)
        }
      })
    },
    // socket初始化
    initWebSocket(first) {
      const ws = new WebSocket(this.wsUrl)
      ws.onopen = () => {
        console.log('=========ws建立=========')
        console.log(ws.readyState)
        this.setWS(ws)
        this.init()
        if (first) {
          this.onlineServer()
        }
        this.keepHeartbeat()
        clearInterval(this.socketTimer)
      }
      ws.onerror = () => {
        if (this.socketTimer) {
          clearInterval(this.socketTimer)
        }
        if (this.heartBeat) {
          clearInterval(this.heartBeat)
        }
        this.initWebSocket()
      }
      ws.onmessage = evt => {
        this.setWsMsg(JSON.parse(evt.data))
      }
      ws.onclose = () => {
        console.log('=========ws关闭=========')
        ws.close()
        clearInterval(this.heartBeat)
        if (this.serverStatus == 'online') {
          if (this.socketTimer) {
            clearInterval(this.socketTimer)
          }
          this.socketTimer = setInterval(() => {
            if (ws.readyState === WebSocket.CLOSED) {
              // 已关闭
              this.initWebSocket()
              // clearInterval(timer)
            }
          }, 3000)
        }
      }
    },
    keepHeartbeat() {
      if (this.heartBeat) {
        clearInterval(this.heartBeat)
      }
      this.heartBeat = setInterval(() => {
        this.ping()
      }, 5000)
    },
    getCustomerDetail() {
      this.msgloading = true
      const {
        activeCustomer: { customer_id: customerid, customer_ip: ip },
        server: { seller_code }
      } = this
      getCustomerDetail({ customerid, seller_code, ip }).then(res => {
        this.msgloading = false
        const { code, data } = res
        if (code === 0) {
          this.setCustomerDetail(data)
          const { address, age, comment, gender, qq, weibo, weixin, isming } = data
          this.cardInfo = { address, age, comment, gender, qq, weibo, weixin, isming }
          this.email = data.email
          this.phone = data.phone
          this.remark = data.remark
          this.customerName = data.customer_name
        }
      })
    },
    clickCustomer(customer) {
     const com = {
        current: 'currentCustomerList',
        history: 'historyCustomerList',
        waiting: 'waitingCustomerList'
      }[this.activeSessionType]
      const index = this[com].findIndex(e=> e.customer_id == customer.customer_id)
      this.$set(this[com][index],'unreadCount',0)
      this.$set(this[com][index],'newFlag',false)
      this.setActiveCustomer(this[com][index])
      this.getCustomerDetail()
      this.$forceUpdate()
      const screenW = document.documentElement.clientWidth
      this.left = 0 - screenW
    },
    // 关闭当前会话  根据会话设置 如果会话设置sessionFinsh==1保留，则离线当前会话但是保留在会话中，如果sessionFinsh==2移除，则离线当前会话并且不保留
    removeSession() {
      const { activeCustomer, currentCustomerList, offlineCustomerList, comeInCustomerList } = this
      if (activeCustomer.customer_id) {
        this.$confirm(this.$t('chatServer.closeSession.message', { customer: activeCustomer.real_name || activeCustomer.customer_name }), this.$t('chatServer.closeSession.tips'), {
          confirmButtonText: this.$t('chatServer.closeSession.confirm'),
          cancelButtonText: this.$t('chatServer.closeSession.cancel'),
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.remark = ''
          if (activeCustomer.inGroup) {
            // 在群组中 0 邀请方 1 被邀请
            if (activeCustomer.Beinvited === 0) {
              this.closeGroupChat()
            }
          } else { // 普通聊天关闭当前会话
            // 发送消息"对话结束"
            this.sendMessage({
              message: this.$t('chatServer.closeSession.end')
            })
            // 结束对话,因为是当前访客，所以不需要入参
            this.closeUser()
            // this.userInit()

            const index = currentCustomerList.findIndex(customer => customer.customer_id == activeCustomer.customer_id)
            if (index != -1) {
              // 拿到当前的这个访客对象
              const closeCustomer = this.$deepcopy(currentCustomerList[index])

              // 当前会话移除
              currentCustomerList.splice(index, 1)
              this.setActiveCustomer({})
              this.setCustomerDetail({})

              // 如果访客跟客服聊过天且放入过离线队列，再离线队列移除
              const offlineCustomer = offlineCustomerList.find(customer => customer.customer_id === closeCustomer.customer_id)
              if (offlineCustomer) {
                this.removeClosedCustomer(closeCustomer)
              }
            }
          }
        })
      } else {
        this.$message.error(this.$t('chatServer.closeSession.select'))
      }
    },
    openTransfer() {
      if (this.activeCustomer.offline || this.serverStatus === 'offline') {
        this.$message.error(this.$t('chatServer.transfer.offline'))
      } else if (this.activeCustomer.customer_id) {
        this.transferVisible = true
      } else {
        this.$message.error(this.$t('chatServer.transfer.select'))
      }
    },
    // 清除 已下线的会话
    async clearOfflineSession(activeCustomer) {
      const { currentCustomerList, offlineCustomerList } = this
      this.currentCustomerList = currentCustomerList.filter(customer => {
        if (activeCustomer) {
          return customer.customer_id != activeCustomer.customer_id
        }

        //   已经下线的会话调用closeUser方法清除掉
        if (customer.offline) {
          this.closeUser(customer.customer_id)
        }
        // 返回最新的会话集合
        return !customer.offline
      })
      // 重置当前会话
      if (!this.currentCustomerList.length) {
        this.setActiveCustomer({})
      } else {
        this.setActiveCustomer(this.currentCustomerList[0])
      }
      // 清除放置在离线会话中的当前会话
      offlineCustomerList.forEach(item => {
        this.removeClosedCustomer(item)
      })
      this.$message({
        message: this.$t('chatServer.curSesDialog.tips[0]'),
        type: 'success'
      })
      this.sessionVisible = false
    },
    // 更新 会话设置配置
    async updateSessionConfig() {
      this.$message.success(this.$t('chatServer.curSesDialog.tips[1]'))
      this.sessionVisible = false
      // localStorageCompatible.setItem('isall', this.isall)
      localStorageCompatible.setItem('sessionOrder', this.sessionOrder)
      localStorageCompatible.setItem('sessionFinsh', this.sessionFinsh)
    },
    // 加入黑名单
    addBlockList() {
      const { activeCustomer, activeSessionType, domain_title: from } = this
      if (!activeCustomer.customer_id) {
        return this.$message.warning(this.$t('chatServer.userInfo.other.addBlack.text[0]'))
      }
      this.$confirm(this.$t('chatServer.userInfo.other.addBlack.message'), this.$t('chatServer.userInfo.other.addBlack.tips'), {
        confirmButtonText: this.$t('chatServer.userInfo.other.addBlack.confirm'),
        cancelButtonText: this.$t('chatServer.userInfo.other.addBlack.cancel'),
        dangerouslyUseHTMLString: true
      }).then(() => {
        const { customer_id, customer_ip: ip, customer_name, real_name: customer_real_name } = activeCustomer
        addBlockList({ customer_id, ip, customer_name, customer_real_name, from }).then(res => {
          const { code, msg } = res
          if (code === 0) {
            const customerKey = activeSessionType + 'CustomerList'
            const index = this[customerKey].findIndex(customer => customer.customer_id == activeCustomer.customer_id)
            this[customerKey].splice(index, 1)
            this.sendMessage({
              message: this.$t('chatServer.userInfo.other.addBlack.text[1]')
            })
            activeSessionType == 'current' && this.closeUser()
            this.userInit()
          } else {
            this.$notify.error({
              title: this.$t('notify.fail'),
              message: msg
            })
          }
        })
      })
    },
    // 接受转接
    reLinkHanlder(data) {
      const { platform } = data
      const { currentCustomerList, activePlatform, platformList } = this
      const customerIndex = currentCustomerList.findIndex(
        customer => customer.customer_id == data.customer_id
      )
      const platformIndex = platformList.findIndex(
        item => item.domain_title === platform
      )
      if (
        customerIndex === -1 &&
        ((platformIndex === -1 && activePlatform === '其他') ||
          (platformIndex !== -1 && activePlatform === platform))
      ) {
        data.newFlag = true
        data.offline = false
        currentCustomerList.push(data)
      }
    },
    // 聊天消息
    async receiveMsgHandler(res, entry) {
      // customer_id 当前推送消息归属的访客id content 消息内容  platform 消息所属平台 state 消息来源
      const { customer_id, content, platform, state, system } = res
      console.log("receiveMsgHandler -> content", content)
      const { currentCustomerList, comeInCustomerList, activeCustomer, platformList, activePlatform, activeState, sessionOrder } = this
      // 推送的消息是否在当前会话里面
      const currentIndex = currentCustomerList.findIndex(customer => {
        return customer.customer_id == customer_id
      })
      console.log("receiveMsgHandler -> currentIndex", currentIndex)
      if (currentIndex !== -1) {
        // 在当前会话
        const currentCustomer = currentCustomerList[currentIndex]
        currentCustomer.offline = false
        this.$set(this.currentCustomerList[currentIndex],'newFlag',false)
        currentCustomer.system = system

        if (activeCustomer.customer_id != currentCustomer.customer_id && entry !== 'customerLink') {
          currentCustomer.unreadCount ? currentCustomer.unreadCount++ : currentCustomer.unreadCount = 1
        }
        if (content) {
          this.$set(this.currentCustomerList[currentIndex],'shortContent',content)
        }
        if (sessionOrder === '2') {
          currentCustomerList.splice(currentIndex, 1)
          currentCustomerList.unshift(currentCustomer)
        }
      } else {
        // 不在当前会话
        const comeInCustomer = comeInCustomerList.find(customer => { return customer.customer_id == customer_id })
        if (comeInCustomer) {
          comeInCustomer.untalk = false
          /**
           * 信息可能来自常规、弹层、其他平台，判断来源是否跟当前平台一直，如果一致而且当前平台没有
           *
           */
          const index = platformList.findIndex(item => item.domain_title === platform)
          if ((activeState === 2 && index === -1) || (activeState === 1 && state === 1) || (activeState === 0 && activePlatform === platform)) {
            const customer = JSON.parse(JSON.stringify(comeInCustomer))
            // 不是访客接入的才有新和未读标识
            if (entry !== 'customerLink') {
              customer.newFlag = true
              customer.unreadCount = 1
              customer.system = system
            }
            if (content) {
              customer.shortContent= content
            }
            // customer.customer_name = name
            if (sessionOrder === '2') {
              currentCustomerList.unshift(customer)
            } else {
              currentCustomerList.push(customer)
            }
            if (currentCustomerList.length == 1) {
              this.clickCustomer(customer)
            }
          }
        }
      }
      this.$forceUpdate()
    },
    // 访客接入
    async comeInCustomerHandler(res) {
      const { customer_id, create_time } = res
      const { comeInCustomerList, currentCustomerList, isall } = this
      const comeInCustomer = comeInCustomerList.find(customer => customer.customer_id == customer_id)

      const { code, msg, total, data } = await getChatList({ page: 1, limit: 20, uid: customer_id, lasttime: create_time })
      if (!comeInCustomer) {
        res.untalk = true
        comeInCustomerList.push(res)
        localStorageCompatible.setItem('comeInCustomerList', JSON.stringify(comeInCustomerList))
        // 如果显示全部会话，显示在当前会话里面，没有聊天记录则不显示
        if (isall == '1' && data.length > 0) {
          this.receiveMsgHandler({...res,content: data[data.length - 1].content}, 'customerLink')
        }
      } else {
        comeInCustomer.remark = res.remark
        comeInCustomer.customer_name = res.customer_name
        comeInCustomer.system = res.system
        // eslint-disable-next-line require-atomic-updates
        // 如果显示全部会话，显示在当前会话里面，没有聊天记录则不显示
        if (isall == '1' && data.length > 0) {
          this.receiveMsgHandler({...res,content: data[data.length - 1].content}, 'customerLink')
        }
      }
      const currentCustomer = currentCustomerList.find(customer => customer.customer_id == customer_id)
      if (currentCustomer) {
        // currentCustomer.offline = false  不改变当前接入访客的在线状态
        this.$forceUpdate()
      }
    },
    // 接待访客成功与否反馈
    receiveVisitorHandler(res) {
      const { code, data, msg } = res
      const success = code === 0

      if (success) {
        const { waitingCustomerList, currentCustomerList } = this

        const index = waitingCustomerList.findIndex(
          customer => customer.customer_id == data.customer_id
        )
        if (index !== -1) {
          const waitingCustomer = waitingCustomerList.splice(index, 1)

          waitingCustomer.newFlag = true
          waitingCustomer.offline = false
          waitingCustomer.unreadCount = 1
          currentCustomerList.push(waitingCustomer)
        }
      }
      this.$notify({
        message: msg,
        title: success ? this.$t('notify.success') : this.$t('notify.fail'),
        type: success ? 'success' : 'error'
      })
    },
    // 访客离线
    offlineHandler(res) {
      const { search_engines, customer_id, customer } = res
      this.setLastTime({
        customer_id,
        search_engines,
        time: parseTime(new Date())
      })
      const { currentCustomerList, sessionFinsh, activePlatform, comeInCustomerList } = this
      // 当前平台访客下线
      if (search_engines === activePlatform) {
        // 找到当前离线的访客
        const index = currentCustomerList.findIndex(customer => {
          return customer.customer_id == customer_id
        })
        if (index != -1) {
          const offlineCustomer = this.$deepcopy(currentCustomerList[index])
          if (sessionFinsh == '2') {
            // 设置会话移除，访客变灰，
            this.$set(
              this.currentCustomerList,
              index,
              {
                ...offlineCustomer,
                offline: true
              }
            )
            // 2分钟后访客移除
            setTimeout(() => {
              const _index = currentCustomerList.findIndex(customer => {
                return customer.customer_id == customer_id
              })
              if (_index != -1) {
                const removeList = currentCustomerList.splice(_index, 1)
                if (removeList.length) {
                  const removeCustomer = removeList[0]
                  if (removeCustomer.customer_id == this.activeCustomer.customer_id) {
                    // 判断下要移除的访客是不是当前访客，如果是的话，重置当前访客
                    this.setActiveCustomer({})
                    this.setCustomerDetail({})
                  }
                }
              }
            }, 120000)
          } else {
            this.$set(
              this.currentCustomerList,
              index,
              {
                ...offlineCustomer,
                offline: true
              }
            )
          }
        }
      }
      // 如果访客跟客服聊过天则放入离线队列
      const offlineCustomer = comeInCustomerList.find(customer => customer.customer_id === customer_id)
      if (offlineCustomer && !offlineCustomer.untalk) {
        customer[0].customer_ip = offlineCustomer.customer_ip
        this.setOfflineCustomerList(customer[0])
      }
    },
    // 转接结果
    transferHandler(res) {
      const { code, data, msg } = res
      const success = code === 0
      if (success) {
        const { currentCustomerList } = this
        const index = currentCustomerList.findIndex(
          customer => customer.customer_id == data.customer_id
        )
        if (index != -1) {
          currentCustomerList.splice(index, 1)
        }
        this.transferVisible = false
      }
      this.$notify({
        message: msg,
        title: success ? this.$t('notify.success') : this.$t('notify.fail'),
        type: success ? 'success' : 'error'
      })
    },
    autoTransferHandler(res) {
      const { msg, data: toServer } = res
      const { currentCustomerList } = this
      if (msg == 'ok') {
        currentCustomerList.forEach(customer => {
          if (!customer.offline) {
            this.transferCustomer({ customer, toServer })
          }
        })
      }
    },
    clickReceiveVisitor() {
      const {
        activeCustomer: { customer_id }
      } = this
      if (!customer_id) {
        return this.$message.warning(this.$t('chatServer.hisSesActions[1]'))
      }
      this.receiveVisitor()
    },
    // 获取会话列表
    async getCustomerList() {
      const { activePlatform, activeSessionType, activeState, sessionFinsh, offlineCustomerList, isall } = this
      const { code, data, msg } = await getCustomerList(this.customerUrl, { search_engines: activePlatform, state: activeState === 2 ? 0 : activeState, isall })
      if (code === 0) {
        if (activeSessionType === 'current' && sessionFinsh === '1') {
          for (let i = 0; i < offlineCustomerList.length; i++) {
            // 一定要深拷贝出离线队列里面的访客对象，因为后面访客上线会修改属性，不然离线队列里面的属性也会被修改
            const offlineCustomer = this.$deepcopy(offlineCustomerList[i])
            const index = data.findIndex(item => item.customer_id === offlineCustomer.customer_id)
            if (index === -1) {
              data.push(offlineCustomer)
            }
          }
        }
        if (activeSessionType == 'history') {
          data.forEach(customer => {
            customer.offline = true
          })
        }
        this[activeSessionType + 'CustomerList'] = data
      } else {
        this.$notify.error({
          title: this.$t('notify.fail'),
          message: msg
        })
      }
    },
    // 点击常用语
    wordClick(content) {
      const screenW = document.documentElement.clientWidth
      this.eventBus.$emit('clickWord', content)
      if (screenW <= 600) {
        this.left = 0 - screenW
      }
    },
    updateCustomerName() {
      const {
        activeCustomer: { customer_id },
        server: { seller_code },
        customerName
      } = this
      if (customer_id) {
        updateCustomerName({
          customer_name: customerName,
          seller_code,
          customer_id
        }).then(res => {
          const success = res.code === 0
          this.$notify({
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error',
            message: success
              ? this.$t('chatServer.userInfo.update.success')
              : this.$t('chatServer.userInfo.update.fail')
          })
          if (success) {
            this[this.activeSessionType + 'CustomerList'].forEach(v => {
              if (customer_id == v.customer_id) {
                v.customer_name = customerName
              }
            })
          }
        })
      }
    },
    clearRemark() {
      this.remark = ''
      this.updateCustomer()
    },
    updateCustomer() {
      const {
        email,
        phone,
        remark,
        activeCustomer: { customer_id, real_name },
        server: { seller_code }
      } = this
      if (customer_id) {
        updateCustomer({
          real_name,
          customer_id,
          seller_code,
          email,
          phone,
          remark
        }).then(res => {
          const success = res.code === 0
          if (success) {
            this[this.activeSessionType + 'CustomerList'].forEach(v => {
              if (customer_id == v.customer_id) {
                v.remark = remark
              }
            })
          }
          this.$notify({
            title: success ? this.$t('notify.success') : this.$t('notify.fail'),
            type: success ? 'success' : 'error',
            message: success
              ? this.$t('chatServer.userInfo.update.success')
              : this.$t('chatServer.userInfo.update.fail')
          })
        })
      }
    },
    logoutHandler() {
      this.currentCustomerList.forEach(customer => {
        this.closeUser(customer.customer_id)
      })
    },
    close2Logout() {
      // 刷新页面
      window.onunload = () => {
        localStorageCompatible.setItem('leaveTime', new Date().getTime())
        this.offlineServer()
      }
      // 刷新页面
      window.unload = () => {
        localStorageCompatible.setItem('leaveTime', new Date().getTime())
        this.offlineServer()
      }
      window.onload = () => {
        let leaveTime = localStorageCompatible.getItem('leaveTime')
        if (leaveTime) {
          localStorageCompatible.removeItem('leaveTime')
          leaveTime = parseInt(leaveTime)
          const nowTime = new Date().getTime()
          const loadTime = nowTime - window.performance.timing.requestStart
          const needLogout = nowTime - loadTime - leaveTime > 1000
          if (needLogout) {
            const {
              $route: { params },
              server
            } = this
            this.serverLogout().then(res => {
              if (res.code == 0) {
                this.$router.push({
                  path: `/login/server/${params.sellerCode || server.seller_code
                  }`
                })
              }
            })
          }
        }
      }
    },
    beOfflineHandler() {
      this.$message({
        message: this.$t('chatServer.beOffline'),
        type: 'warning'
      })
      const { seller_code } = this.server
      this.serverLogout().then(res => {
        const { code, msg } = res
        if (code == 0) {
          this.$router.push({ path: `/login/server/${seller_code}` })
        } else {
          this.$notify.error({
            title: this.$t('notify.fail'),
            message: msg
          })
        }
      })
    },
    inviteServerHandler() {
      const {
        activeCustomer: { offline }
      } = this
      if (offline) {
        this.$message.error('访客已离开')
        return
      }
      const {
        customerDetail: { domain_id }
      } = this
      if (domain_id) {
        this.inviteServer.visible = true
        this.inviteServer.platformId = domain_id
      }
    },
    receiveSessionHandler(res) {
      const { revitationList } = this
      const sameTimeVitation = revitationList.find(
        revitation => revitation.timestamp === res.timestamp
      )
      if (sameTimeVitation) {
        /**
         * 存在同时发来的邀请，有可能是不同客服同时发来的邀请；也可能是一个客服存在多条ws连接，导致一个消息发送了多次，对于这种情况需要根据客服code进行过滤
         */
        if (sameTimeVitation.from_kefu_id === res.from_kefu_id) {
          return
        }
      }
      revitationList.push(res)
      const message = `
				<div class="server">
				<img class="server-avatar" src="${this.baseUrl + res.kefu_avatar}" />
				<div class="server-name">${this.$t('chatServer.receiveInvite[0]')} ${res.from_kefu_name} ${this.$t('chatServer.receiveInvite[1]')}</div>
				</div>
			`
      this.$confirm(message, {
        confirmButtonText: this.$t('chatServer.receiveInvite[2]'),
        cancelButtonText: this.$t('chatServer.receiveInvite[3]'),
        center: true,
        customClass: 'receive-session',
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.acceptInvitation(res)
        this.setIdentityInGroup(1)
      }).catch(() => {
        this.refuseInvite(res)
      })
    },
    // 群组建立反馈
    groupALLHandler(res) {
      const { code, data } = res
      const { activeCustomer } = this

      if (activeCustomer.Beinvited === 0) {
        // 邀请方
        this.setCustomerInGroup()
      } else {
        // 被邀请方
        if (code === 200) {
          const { currentCustomerList, activePlatform, sessionOrder } = this

          const curIndex = currentCustomerList.findIndex(
            customer => customer.customer_id === data.customer_id
          )
          if (data.platform === activePlatform && curIndex === -1) {
            data.newFlag = true
            data.offline = false
            data.inGroup = true
            if (sessionOrder === '2') {
              currentCustomerList.unshift(data)
            } else {
              currentCustomerList.push(data)
            }
          }
        }
      }
    },
    // 群组关闭反馈
    closeGroupCallback(res) {
      const { code, msg, customer_id } = res
      const { activeCustomer, currentCustomerList, sessionFinsh } = this
      if (activeCustomer.Beinvited === 0) {
        // 邀请方
        if (code === 204) {
          this.sendMessage({
            message: this.$t('chatServer.closeSession.end')
          })
          this.closeUser()
          this.userInit()
          const index = currentCustomerList.findIndex(
            customer => customer.customer_id == activeCustomer.customer_id
          )
          if (index != -1) {
            const closeCustomer = currentCustomerList[index]
            currentCustomerList.splice(index, 1)
            this.setActiveCustomer({})
            if (closeCustomer.offline) {
              this.removeClosedCustomer(closeCustomer)
            }
          }
        } else {
          this.$notify.error({
            title: this.$t('notify.fail'),
            message: msg
          })
        }
      } else {
        // 被邀请方
        if (code === 204) {
          const index = currentCustomerList.findIndex(
            customer => customer.customer_id == customer_id
          )
          currentCustomerList.splice(index, 1)
          if (activeCustomer.customer_id === customer_id) {
            this.setActiveCustomer({})
          }
        }
      }
    },
    // 用户信息类别筛选
    handleLi(i) {
      this.activeLi = i
    },
    // 是否展开访客信息
    collapseUserInfo() {
      this.isOpenUserInfo = this.isOpenUserInfo === '0' ? '1' : '0'
      localStorageCompatible.setItem('isOpenUserInfo', this.isOpenUserInfo)
    },
    dateformat(timestamp, format = 'HH:mm') {
      const date = new Date(timestamp)
      const opts = {
        'y+': date.getFullYear().toString(), // 年
        'M+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'm+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString() // 秒
      }
      let ret
      for (const opt in opts) {
        ret = new RegExp('(' + opt + ')').exec(format)
        if (ret) {
          format = format.replace(ret[1], (ret[1].length === 1) ? (opts[opt]) : (opts[opt].padStart(ret[1].length, '0')))
        }
      }
      return format
    },
    handleSend(res) {
      const { msg } = res
      const { includeImg, content } = extractImage(msg)
      const index = this.currentCustomerList.findIndex(i=> i.customer_id === this.activeCustomer.customer_id)
      this.$set(this.currentCustomerList[index], 'shortContent', content)
    },
    ...mapActions('auth', ['serverLogout']),
    ...mapActions('chatServer', [
      'init',
      'ping',
      'userInit',
      'closeUser',
      'offlineServer',
      'onlineServer',
      'sendMessage',
      'receiveVisitor',
      'transferSession',
      'transferCustomer',
      'acceptInvitation',
      'refuseInvite',
      'closeGroupChat'
    ]),
    ...mapMutations('chatServer', [
      'setWS',
      'setWsMsg',
      'setServerStatus',
      'setActiveCustomer',
      'setActiveSession',
      'setCustomerDetail',
      'setOfflineCustomerList',
      'removeClosedCustomer',
      'setIdentityInGroup',
      'setCustomerInGroup',
      'setLastTime',
      'setChatLang',
      'setCurrentCustomer'
    ])
  },
  mounted() {
    this.setServerStatus('online')
    this.getDailyWordCustom() // 请求自定义常用语
    this.getSellerInfo()
    this.close2Logout()
    document.title = this.$t('chatServer.title')
    if (this.socketTimer) {
      clearInterval(this.socketTimer)
    }
    if (this.heartBeat) {
      clearInterval(this.heartBeat)
    }

    eventBus.$on('clearActiveCustomer', this.clearOfflineSession)
    eventBus.$on('handleSend', this.handleSend)
    // 获取用户设置的语言
    this.curLang = window.localStorage.getItem('chat-server-lang') || 'close'
    this.setChatLang(this.curLang)
  },
  beforeUnmount() {
    if (this.socketTimer) {
      clearInterval(this.socketTimer)
    }
    if (this.heartBeat) {
      clearInterval(this.heartBeat)
    }
  }
}
</script>

<style lang="scss" scoped>
.server {
  display: flex;
  height: 100vh;
  .server-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--chat-server-content-bg);
    .server-main__body {
      display: flex;
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      .wrap-content {
        display: flex;
        flex: 1;
        overflow-y: auto;
        // background: var(--chat-server-content-bg);
      }
      .customer-wrap {
        width: 300px;
        // border-right: 1px solid var(--chat-server-border);
        // overflow-y: auto;
        background: var(--chat-server-customer-wrap-bg);
        border-right: 4px solid var(--chat-server-content-bg);
        > div {
          flex-direction: column;
          overflow-y: auto;
        }
        .customer-wrap__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 9px 20px;
          // border-bottom: 1px solid var(--talk-record-border);
          line-height: 25px;
          font-size: 16px;
          font-weight: bold;
          color: var(--el-tabs-content);
          // background: var(--talk-record-customer-head-bg);
        }
        .customer-list {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          scrollbar-width: none; /* firefox */
          -ms-overflow-style: none; /* IE 10+ */
          overflow-x: hidden;
          overflow-y: auto;
          &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
          }
        }
        .customer-item {
          display: flex;
          padding: 12px;
          color: var(--chat-server-customer-item-content);
          cursor: pointer;
          flex-direction: column;
          margin-bottom: 22px;
          position: relative;
          .customer-item-top {
            position: relative;
            display: flex;
            width: 100%;
            align-items: center;
            .shortContent{
              min-height: 12px;
              display: flex;
              .shortContent-text{
                flex: 1;
                max-width: 85%;
              }
            }
            .name-box{
              width: 214px;
              flex: 1;
              .name{
                display: flex;
                width: 100%;
                .time{
                  margin-left: auto;
                }
              }
            }
            .customer-avatar-wrap {
              position: relative;
              .svg-icon {
                width: 22px;
                height: 22px;
                top: 26px;
                left: 26px;
                position: absolute;
              }
            }
          }
          .customer-item-bottom {
            margin-top: 12px;
            border-top: 1px solid var(--chat-server-customer-border);
            padding-top: 5px;
            display: flex;
            align-items: center;
            > span {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              overflow: hidden;
              /*! autoprefixer: off */
              -webkit-box-orient: vertical;
            }
          }
          .avatar {
            margin-right: 14px;
            width: 44px;
            height: 44px;
            border-radius: 50%;
          }
          .name {
            margin-bottom: 12px;
            color: var(--chat-server-customer-item-title);
            margin-top: 5px;
            font-size: 15px;
          }
          .time {
            color: #6b6b6b;
          }
          .badge {
            margin-left: auto;
            padding: 1px;
            width: 20px;
            height: 20px;
            align-items: center;
            justify-content: center;
            display: flex;
            border-radius: 50%;
            flex-shrink: 0;
            color: #fff;
            font-size: 10px;
            background-color: #ff5630;
            &.char {
              font-size: 8px;
            }
          }
          &.active,
          &:hover {
            &:after {
              content: "";
              width: 4px;
              height: 77px;
              background: var(
                  --chat-server-customer-item-active-title
              );
              position: absolute;
              right: 0;
              top: 0;
            }
            &:before {
              content: "";
              width: 100%;
              height: 77px;
              background: #2700ff;
              //background: #5082f4;
              position: absolute;
              right: 0;
              top: 0;
              opacity: 0.1;
            }
            .name {
              color: var(
                  --chat-server-customer-item-active-title
              );
            }
            // background: var(--chat-server-customer-item-active-bg);
          }
          &.offline {
            .customer-item-bottom,
            .customer-item-top {
              filter: grayscale(100%);
            }
          }
        }
      }
      .chat-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        background: var(--chat-server-main-bg);
        .lang-item-dropdown {
          cursor: pointer;
          min-width: 110px;
          display: flex;
          justify-content: flex-end;
          .svg-icon {
            width: 24px;
            height: 24px;
            color: currentColor;
          }
          .lang-item {
            span {
              display: flex;
              align-items: center;
              line-height: 30px;
            }
          }
        }
        // border-right: 1px solid var(--chat-server-border);
        .chat-wrap__head {
          line-height: 30px;
          // border-bottom: 1px solid var(--chat-server-border);
          padding: 0 15px 0 30px;
          color: var(--chat-server-chat-head);
          .flex-aic{
            flex-wrap: wrap;
          }
          .option-item {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            margin-right: 20px;
            .svg-icon {
              margin-right: 10px;
              // font-size: 20px;
              // &.close {
              // 	font-size: 15px;
              // }
            }
            // & + .option-item {
            //   margin-right: 20px;
            // }
          }
          ::v-deep.el-radio-group {
            width: 100%;
            border-bottom: 1px solid
            var(--chat-server-invite-dialog-border);
            &:last-child {
              margin-bottom: 0;
            }
            .el-radio {
              display: block;
              margin: 0 0 20px;
            }
            &:first-child {
              margin-bottom: 20px;
            }
          }
          .el-popover__reference {
            padding: 0;
            border: none;
            color: var(--chat-server-chat-head);
            font-size: 12px;
            background: transparent;
          }
          ::v-deep.session-dialog {
            .el-dialog__body {
              padding: 10px 20px 2px;
            }
            .el-dialog__footer {
              border-top: 1px solid
              var(--chat-server-invite-dialog-border);
            }
          }
        }
      }
      .words-wrap {
        width: 350px;
        margin-left: 20px;
        background: var(--chat-server-main-bg);
        ::v-deep.el-tabs {
          display: flex;
          flex-direction: column;
          height: 100%;
          .el-tabs__nav-wrap:after {
            height: 0;
          }
          .el-tabs__header {
            border-bottom: 4px solid var(--el-tabs-border);
          }
          .el-tabs__content {
            padding: 0 20px;
            flex: 1;
            overflow-y: scroll;
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */
            overflow-x: hidden;
            overflow-y: auto;
            &::-webkit-scrollbar {
              display: none; /* Chrome Safari */
            }
            .arrow-down {
              transform: rotate(90deg);
            }
            .arrow-up {
              transform: rotate(-90deg);
            }
          }
          .el-tabs__nav-scroll {
            padding-left: 20px;
          }
          .el-tabs__item {
            font-size: 16px;
            padding: 10px 30px 10px 0;
            height: auto;
            opacity: 0.5;
            &.is-active {
              font-size: 18px;
              opacity: 1;
            }
            &:last-child {
              padding-right: 0;
            }
          }
          // .el-tabs__header{
          //   padding: 18px 30px;
          // }
          .el-tabs__active-bar {
            width: 22px !important;
            height: 3px;
            background: #5082f4;
          }
        }
        #pane-userInfo {
          ul {
            padding: 0;
            display: flex;
            justify-content: space-between;
            li {
              font-size: 16px;
              cursor: pointer;
              color: var(--chat-server-tab-default);
              &.active {
                color: var(--chat-server-tab-active);
              }
            }
          }
        }

        .info-item {
          margin-top: 6px;
          .info-item__header {
            height: 40px;
            line-height: 40px;
            padding-left: 15px;
            margin-bottom: 10px;
            border-radius: 0 2px 2px 0;
            border-left: 5px solid #5082f4;
            background-color: #f2f2f2;
            background: var(--chat-server-user-info-head-bg);
          }
          .info-item__body {
            &.clearTextArea {
              position: relative;
              .clearButton {
                position: absolute;
                border-radius: 5px;
                position: absolute;
                right: 3px;
                z-index: 2;
                border: none;
                bottom: 3px;
                height: 40px;
                cursor: pointer;
                color: #ccc;
                transform: translateX(2px);
                user-select: none;
              }
            }
            &.card {
              background: var(--chat-server-content-bg);
              padding: 20px;
              > div {
                > div:not(.mb0) {
                  margin-bottom: 24px;
                  p {
                    margin: 0;
                    color: var(--chat-server-card-input);
                  }
                }
              }
            }
            line-height: 30px;
            color: var(--chat-server-card-label);
            .icon-skype {
              color: #01aaed;
              cursor: pointer;
            }
            .join-blacklist {
              display: flex;
              align-items: center;
              font-size: 16px;
              color: #999;
              cursor: pointer;
              .iconfont {
                margin-right: 6px;
              }
            }
            ::v-deep .el-input__inner {
              padding: 0;
              border: none;
              background: transparent !important;
            }
          }
        }
        ::v-deep.el-collapse-item {
          margin-bottom: 10px;
          .el-collapse-item__header {
            padding-left: 10px;
            background: #f2f2f2;
          }
        }
        .common-words {
          .setting-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          ::v-deep.el-collapse-item {
            // border: 1px solid #e6e6e6;
            & + .el-collapse-item {
              border-top: none;
            }
            .el-collapse-item__header {
              position: relative;
              height: 50px;
              padding-left: 20px;
              line-height: 50px;
              border-radius: 6px;
              .el-collapse-item__arrow {
                position: absolute;
                z-index: 1;
                right: 10px;
              }
            }
            .el-collapse-item__wrap {
              border: 0;
              margin-top: 10px;
              .el-collapse-item__content {
                padding: 0 10px 10px;
              }
            }
          }
          .coll-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px dashed var(--el-collapse-border);
            & > span {
              width: 70%;
              .reference {
                // width: 100%;
                cursor: pointer;
                // border: 1px solid var(--chat-server-border);
                padding: 20px 10px;
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-weight: 500;
                display: flex;
                align-items: center;
                .svg-icon {
                  width: 8px;
                  height: 10px;
                  margin-right: 8px;
                }
                p {
                  width: 100%;
                  display: inline-block;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }
            .send-btn {
              cursor: pointer;
              padding: 3px 10px;
              border: 1px solid var(--chat-server-send-btn-border);
              font-size: 14px;
              border-radius: 15px;
              color: #6ecc94;
            }
          }
        }
      }
    }
  }
}
.popover-popper .content {
  width: 200px;
  height: 250px;
}
@media (max-width: 1500px) {
  .server .server-main .server-main__body .chat-wrap .option-item-txt {
    display: none;
  }
}
@media (max-width: 600px) {
  .server {
    height: calc(var(--vh, 1vh) * 100);
    .server-main {
      .server-main__body {
        display: block;
        width: 100vw;
        overflow-x: hidden;
        position: relative;
        .wrap-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 300vw;
          transition: left 0.3s;
          &.wrap-list-height {
            height: calc(100% - 68px);
            overflow: hidden;
          }
          // height: calc(100% - 68px);
        }
        .customer-wrap {
          width: 100vw;
          height: calc(var(--vh, 1vh) * 100 - 60px);
          border: 0;
          .customer-list {
            flex: 1;
            height: 100%;
            &::-webkit-scrollbar {
              display: none;
            }
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */
            overflow-x: hidden;
            overflow-y: auto;
            .customer-item {
              border-bottom: 2px solid
              var(--chat-server-content-bg);
              margin-bottom: 0;
            }
            .customer-item-bottom {
              border: 0;
            }
          }
          .customer-wrap__header {
            background: var(--chat-server-content-bg);
            padding: 14px 20px;
          }
        }
        .chat-wrap {
          width: 100vw;
          height: calc(var(--vh, 1vh) * 100 - 60px);
          // flex: unset !important;
          &::-webkit-scrollbar {
            display: none;
          }
          scrollbar-width: none; /* firefox */
          -ms-overflow-style: none; /* IE 10+ */
          overflow-x: hidden;
          overflow-y: auto;
          .lang-item-dropdown {
            position: absolute;
            bottom: -30px;
            right: 20px;
            .lang-item {
              span {
                display: flex;
                align-items: center;
                line-height: 30px;
                .svg-icon {
                  width: 24px;
                  height: 24px;
                }
              }
            }
          }
          .flex-jcsb-aic {
            display: block;
            width: 100%;
            > span {
              display: none;
            }
            .flex-aic {
              display: flex;
              justify-content: space-around;
              width: 100%;
            }
            .lang-item {
              cursor: pointer;
            }
          }
          .option-item {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .option-item-txt {
            display: block;
            line-height: 30px;
          }
          .chat-content {
            &::-webkit-scrollbar {
              display: none;
            }
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */
            overflow-x: hidden;
            overflow-y: auto;
            margin: 30px 0 20px 0;
          }
          .chat-wrap__head {
            background: var(--chat-server-content-bg);
            line-height: 70px;
            padding: 0;
            height: 94px;
            width: 100%;
            align-items: center;
            display: flex;
            position: relative;
            .svg-icon {
              width: 22px;
              height: 22px;
              margin: 0 !important;
            }
            &.hide-chat {
              display: none;
            }
          }
          ::v-deep.el-dialog__footer {
            height: auto !important;
          }
        }
        .words-wrap {
          width: 100vw;
          height: calc(var(--vh, 1vh) * 100 - 60px);
          overflow-y: scroll;
          margin-left: 0;
          &::-webkit-scrollbar {
            display: none;
          }
          ::v-deep.el-tabs {
            .el-tabs__header {
              border: 0 !important;
            }
            .el-tabs__nav-scroll {
              padding: 0;
              display: flex;
              justify-content: center;
            }
          }
          .coll-content {
            > span {
              width: 80%;
              .reference {
                p {
                  width: 100%;
                  display: inline-block;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
      }
    }
  }
  ::v-deep.set-dialog {
    .el-dialog {
      width: 90% !important;
      .el-dialog__footer .el-button {
        width: 100px !important;
      }
    }
  }
}
</style>

<style lang="scss">
.copy-reference {
  padding: 10px;
  background: rgb(53, 149, 204);
  color: #fff;
  .popper__arrow::after {
    border-bottom-color: rgb(53, 149, 204) !important;
  }
}
.receive-session {
  .server-avatar {
    width: 58px;
    height: 58px;
    border-radius: 50%;
  }
}
.set-helloword{
  .el-dialog{
    width: 60%;
  }
}
@media screen and (max-width: 600px) {
  .set-helloword{
    .el-dialog{
      width: 80%;
    }
  }
}
</style>
