<template>
    <div :id="position + '-wrapper'" class="fab-wrapper" v-on-clickaway="away"
         :style="[ pos, {zIndex: zIndex}, {position: positionType} ]">
        <div :id="position + '-action'" class="actions-container" :style="listPos">
            <transition name="fab-actions-appear"
                        :enter-active-class="transitionEnter"
                        :leave-active-class="transitionLeave"
            >
                <ul v-show="toggle" class="fab-list">
                    <template v-for="action in actions">
                        <transition
                                enter-active-class="animated quick zoomIn"
                                leave-active-class="animated quick zoomOut"
                                v-on:after-enter="afterActionsTransitionEnter"
                        >
                            <template v-if="action.tooltip">
                                <li v-if="toggle" :style="{ 'background-color': action.color || bgColor }"
                                    v-tooltip="{ content: action.tooltip, placement: tooltipPosition, classes: 'fab-tooltip', trigger: tooltipTrigger}"
                                    @click="toParent(action.name)" class="pointer"
                                    ref="actions">
                                    <i :class="[ actionIconSize ,'material-icons']">{{action.icon}}</i>
                                </li>
                            </template>
                            <template v-else>
                                <li v-if="toggle" :style="{ 'background-color': action.color || bgColor }"
                                    @click="toParent(action.name)" class="pointer">
                                    <i :class="[ actionIconSize ,'material-icons']">{{action.icon}}</i>
                                </li>
                            </template>
                        </transition>
                    </template>
                </ul>
            </transition>
        </div>
        <template v-if="rippleShow">
            <template v-if="mainTooltip">
                <div v-ripple="rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''" @click="toggle = !toggle"
                     v-tooltip="{ content: mainTooltip, placement: tooltipPosition, classes: 'fab-tooltip' }"
                     class="fab-main pointer" :style="{ 'background-color': bgColor, 'padding': paddingAmount }"
                >
                    <i :class="[ mainIconSize , { rotate: toggle && allowRotation } ,'material-icons main']">{{mainIcon}}</i>
                    <i :class="[ mainIconSize , { rotate: toggle && allowRotation } ,'material-icons close']">add</i>
                </div>
            </template>
            <template v-else>
                <div v-ripple="rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''" @click="toggle = !toggle"
                     class="fab-main pointer" :style="{ 'background-color': bgColor, 'padding': paddingAmount }"
                >
                    <i :class="[ mainIconSize , { rotate: toggle && allowRotation }, 'material-icons main']">{{mainIcon}}</i>
                    <i :class="[ mainIconSize , { rotate: toggle && allowRotation }, 'material-icons close']">add</i>
                </div>
            </template>
        </template>
        <template v-else>
            <template v-if="mainTooltip">
                <div v-bind:v-tooltip="{ content: mainTooltip, placement: tooltipPosition, classes: 'fab-tooltip'}"
                     class="fab-main pointer" :style="{ 'background-color': bgColor, 'padding': paddingAmount }"
                >
                    <i class="material-icons md-36 main" :class="{ rotate: toggle && allowRotation }">{{mainIcon}}</i>
                    <i class="material-icons md-36 close" :class="{ rotate: toggle && allowRotation }">add</i>
                </div>
            </template>
            <template v-else>
                <div class="fab-main pointer" :style="{ 'background-color': bgColor, 'padding': paddingAmount }"
                >
                    <i class="material-icons md-36 main" :class="{ rotate: toggle && allowRotation }">{{mainIcon}}</i>
                    <i class="material-icons md-36 close" :class="{ rotate: toggle && allowRotation }">add</i>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    import {mixin as clickaway} from 'vue-clickaway';
    import Ripple from 'vue-ripple-directive';
    import {VTooltip} from 'v-tooltip'

    export default {
        mixins: [clickaway],
        directives: {Ripple, tooltip: VTooltip},
        data() {
            return {
                toggle: this.startOpened,
                pos: {},
                tooltipPosition: 'left'
            }
        },
        props: {
            bgColor: {
                default: '#333333',
            },
            position: {
                default: 'bottom-right',
            },
            positionType: {
                default: 'fixed',
            },
            zIndex: {
                default: '999',
            },
            rippleShow: {
                default: true
            },
            rippleColor: {
                default: 'light'
            },
            mainIcon: {
                default: 'add'
            },
            iconSize: {
                default: 'medium'
            },
            mainTooltip: {
                default: null
            },
            fixedTooltip: {
                default: false
            },
            tooltipTimeOutWhenStartOpened: {
                default: 200
            },
            enableRotation:{
                default: true
            },
            actions: {
                default: () => []
            },
            startOpened: {
                default: false
            },
            toggleWhenAway: {
                default: true
            },
        },
        computed: {
            actionIconSize() {
                switch (this.iconSize) {
                    case 'small':
                        return 'md-18';
                        break;
                    case 'medium':
                        return 'md-24';
                        break;
                    case 'large':
                        return 'md-36';
                        break;
                    default:
                        return 'md-24';
                }
            },
            allowRotation(){
                return this.enableRotation &&  this.actions && this.actions.length;
            },
            mainIconSize() {
                switch (this.iconSize) {
                    case 'small':
                        return 'md-24';
                        break;
                    case 'medium':
                        return 'md-36';
                        break;
                    case 'large':
                        return 'md-48';
                        break;
                    default:
                        return 'md-36';
                }
            },
            paddingAmount() {
                switch (this.iconSize) {
                    case 'small':
                        return '28px';
                        break;
                    case 'medium':
                        return '32px';
                        break;
                    case 'large':
                        return '38px';
                        break;
                    default:
                        return '32px';
                }
            },
            listPos() {
                if (this.position === 'top-right' || this.position === 'top-left') {
                    return {
                        top: '-20px',
                        paddingTop: '20px'
                    }
                }
                return {
                    bottom: '-20px',
                    paddingBottom: '20px'
                }
            },
            transitionEnter() {
                let animation = this.animation;
                return animation.enter;
            },
            transitionLeave() {
                let animation = this.animation;
                return animation.leave;
            },
            animation() {
                if (this.position === 'top-right' || this.position === 'top-left') {
                    return {
                        enter: 'animated quick fadeInDown',
                        leave: 'animated quick fadeOutUp'
                    };
                } else if (this.position === 'bottom-right' || this.position === 'bottom-left') {
                    return {
                        enter: 'animated quick fadeInUp',
                        leave: 'animated quick fadeOutDown'
                    };
                } else {
                    return {
                        enter: 'animated fadeInUp',
                        leave: 'animated fadeOutDown'
                    };
                }
            },
            tooltipTrigger() {

                if (this.fixedTooltip) {
                    return 'manual';
                }

                return 'hover';
            }
        },
        methods: {
            tooltipPos() {
                if (this.position === 'top-right' || this.position === 'bottom-right') {
                    this.tooltipPosition = 'left'
                } else {
                    this.tooltipPosition = 'right'
                }
            },
            toParent(name) {
                this.$emit(name);
                this.toggle = false;
            },
            away() {
                if(this.toggleWhenAway) {
                    this.toggle = false;
                }
            },
            setPosition() {
                this.pos = {};
                switch (this.position) {
                    case 'bottom-right':
                        this.pos.right = '5vw';
                        this.pos.bottom = '4vh';
                        break;
                    case 'bottom-left':
                        this.pos.left = '5vw';
                        this.pos.bottom = '4vh';
                        break;
                    case 'top-left':
                        this.pos.left = '5vw';
                        this.pos.top = '4vh';
                        break;
                    case 'top-right':
                        this.pos.right = '5vw';
                        this.pos.top = '4vh';
                        break;
                    default:
                        this.pos.right = '5vw';
                        this.pos.bottom = '4vh';
                }
            },
            moveTransition() {
                let wrapper = document.getElementById(this.position + '-wrapper');
                let el = document.getElementById(this.position + '-action');

                if (this.position === 'top-right' || this.position === 'top-left') {
                    wrapper.appendChild(el);
                } else {
                    wrapper.insertBefore(el, wrapper.childNodes[0]);
                }
            },
            showTooltip(timeOut = 0) {
                if (this.toggle && this.actions.length && this.fixedTooltip) {
                  setTimeout(() => {
                    this.$refs.actions.forEach((item) => {
                      if(this.toggle) {
                        item._tooltip.show();
                      }
                    });
                  },timeOut);
                }
            },
            afterActionsTransitionEnter() {
                this.showTooltip();
            }
        },
        watch: {
            position(val){
                this.setPosition();

                this.$nextTick(() => {
                    this.moveTransition();
                    this.tooltipPos();
                });
            }
        },
        mounted() {
            this.moveTransition();
        },
        created() {
            this.setPosition();

            if (this.startOpened) {
                this.showTooltip(this.tooltipTimeOutWhenStartOpened);
            }
        }
    }
</script>

<style>
    .fab-tooltip.tooltip {
        display: block !important;
        padding: 4px;
        z-index: 10000;
    }

    .fab-tooltip.tooltip .tooltip-inner {
        background: #333333;
        color: white;
        border-radius: 0px;
        padding: 5px 10px 4px;
    }

    .fab-tooltip.tooltip tooltip-arrow {
        display: none;
    }

    .fab-tooltip.tooltip[aria-hidden='true'] {
        visibility: hidden;
        opacity: 0;
        transition: opacity .15s, visibility .15s;
    }

    .fab-tooltip.tooltip[aria-hidden='false'] {
        visibility: visible;
        opacity: 1;
        transition: opacity .15s;
    }
</style>

<style scoped>
    .animated.quick {
        -webkit-animation-duration: .7s !important;
        animation-duration: .7s !important;
    }

    .fab-wrapper {
        z-index: 999;
    }

    .fab-main {
        border-radius: 100px;
        /*width: 65px;*/
        /*height: 65px;*/
        padding: 30px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.20), 0 4px 4px rgba(0, 0, 0, 0.15);
        z-index: 2;
        justify-content: center;
    }

    .fab-main .material-icons {
        color: white;
        -webkit-transition: .4s all;
        -moz-transition: .4s all;
        transition: .4s all;
        margin: 0px auto;
    }

    .fab-main .material-icons.main {
        opacity: 1;
        position: absolute;
    }

    .fab-main .material-icons.close {
        opacity: 0;
        position: absolute;
    }

    .fab-main .material-icons.main.rotate {
        -ms-transform: rotate(315deg); /* IE 9 */
        -webkit-transform: rotate(315deg); /* Chrome, Safari, Opera */
        transform: rotate(315deg);
        opacity: 0;
        -webkit-transition: opacity .3s ease-in, -webkit-transform .4s; /* Safari */
        transition: opacity .3s ease-in, transform .4s;
    }

    .fab-main .material-icons.close.rotate {
        -ms-transform: rotate(315deg); /* IE 9 */
        -webkit-transform: rotate(315deg); /* Chrome, Safari, Opera */
        transform: rotate(315deg);
        opacity: 1;
        -webkit-transition: opacity .3s ease-in, -webkit-transform .4s; /* Safari */
        transition: opacity .3s ease-in, transform .4s;
    }

    .fab-list {
        position: relative;
        z-index: 1;
        margin: 2vh 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .fab-list li {
        /*width: 50px;*/
        /*height: 50px;*/
        padding: 10px;
        margin-top: 2vh;
        display: flex;
        align-items: center;
        border-radius: 100px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.20), 0 4px 4px rgba(0, 0, 0, 0.15);
    }

    .fab-list li .material-icons {
        color: white;
        margin: 0px auto;
    }

    .pointer {
        cursor: pointer;
    }

    ul {
        list-style-type: none;
        padding: 0 !important;
    }

    .fab-wrapper .actions-container {
        overflow: hidden;
        z-index: 0;
        position: relative;
    }

    /* Rules for sizing the icon. */
    .material-icons.md-18 {
        font-size: 18px;
    }

    .material-icons.md-24 {
        font-size: 24px;
    }

    .material-icons.md-36 {
        font-size: 36px;
    }

    .material-icons.md-48 {
        font-size: 48px;
    }

    /* Rules for using icons as black on a light background. */
    .material-icons.md-dark {
        color: rgba(0, 0, 0, 0.54);
    }

    .material-icons.md-dark.md-inactive {
        color: rgba(0, 0, 0, 0.26);
    }

    /* Rules for using icons as white on a dark background. */
    .material-icons.md-light {
        color: rgba(255, 255, 255, 1);
    }

    .material-icons.md-light.md-inactive {
        color: rgba(255, 255, 255, 0.3);
    }

    @media screen and (max-width: 768px) {
        .fab-list {
            margin: 2vh 0;
        }

        .fab-list li {
            /*width: 40px;*/
            /*height: 40px;*/
            /*padding: .6rem;*/
        }

        .fab-list li i {
            /*font-size: 24px !important;*/
        }

        .fab-main {
            /*width: 55px;*/
            /*height: 55px;*/
            /*padding: 1.5rem;*/
        }

        .fab-main i {
            /*font-size: 34px !important;*/
        }

    }
</style>
