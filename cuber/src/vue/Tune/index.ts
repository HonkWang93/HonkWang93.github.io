import Vue from "vue";
import { Component, Inject, Prop } from "vue-property-decorator";
import Tune from "../Tune";
import Context from "../context";
import Preferance from "../../cuber/preferance";

@Component({
  template: require("./index.html"),
  components: {
    tune: Tune
  }
})
export default class Dash extends Vue {
  @Inject("context")
  context: Context;

  @Prop({ required: true })
  value: boolean;

  get show() {
    return this.value;
  }

  set show(value) {
    this.$emit("input", value);
  }

  width: number = 0;
  height: number = 0;
  preferance: Preferance;
  constructor() {
    super();
    this.preferance = this.context.cuber.preferance;
  }
  mounted() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
