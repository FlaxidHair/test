import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isFind: null,
    fName: "",
    lName: "",
    company: "",
    jobTitle: "",
    phone: "",
    email: "",
    interest: "",
    findedPerson: [],
    nameHeaders: [
      { text: "Все", icon: "mdi-check-circle" },
      { text: "Обработанные", icon: "mdi-check-circle" },
      { text: "Не обработанные", icon: "mdi-alert-circle" },
    ],
    itemsInnerStatus: [
      {
        text: "Статус",
        align: "start",
        sortable: false,
        value: "status",
      },
      { text: "Имя", align: "start", sortable: false, value: "firstName" },
      { text: "Фамилия", value: "lastName", sortable: false },
      { text: "Компания", value: "company", sortable: false },
      { text: "Специальность", value: "jobTitle", sortable: false },
      { text: "Телефон", value: "phone", sortable: false },
      { text: "E-mail", value: "email", sortable: false },
      { text: "Интересы", value: "interests", sortable: false },
    ],
    itemsInner: [
      { text: "Имя", align: "start", sortable: false, value: "firstName" },
      { text: "Фамилия", value: "lastName", sortable: false },
      { text: "Компания", value: "company", sortable: false },
      { text: "Специальность", value: "jobTitle", sortable: false },
      { text: "Телефон", value: "phone", sortable: false },
      { text: "E-mail", value: "email", sortable: false },
      { text: "Интересы", value: "interests", sortable: false },
    ],
    noDataText: "Нет пользователей",
    items: [],
    activeItems: [],
    unActiveItems: [],
    deleteItem: null,
    selected: [],
    isShow: false,
    actionsSelect: null,
    itemChoose: ["Изменить", "Удалить", "Добавить"],
  },
  getters: {
    getUserss(state) {
      return state.items;
    },
    getUserS(state) {
      return state.findedPerson;
    },
    getUserssActive(state) {
      state.activeItems = state.items.filter((el) => {
        return el.status == true;
      });
      return state.activeItems;
    },
    getUserssUnActive(state) {
      state.unActiveItems = state.items.filter((el) => {
        return el.status == false;
      });
      return state.unActiveItems;
    },
    getId(state) {
      return state.deleteItem;
    },
    takeInfo(state) {
      return {
        fName: state.fName,
        lName: state.lName,
        company: state.company,
        jobTitle: state.jobTitle,
        phone: state.phone,
        email: state.email,
        interest: state.interest,
      };
    },
  },
  mutations: {
    isShowingSearch(state) {
      this.getters.takeInfo.values != ""
        ? (state.isFind = true)
        : (state.isFind = false);
    },

    clearSearch(state) {
      state.fName = "";
      state.lName = "";
      state.company = "";
      state.jobTitle = "";
      state.phone = "";
      state.email = "";
      state.interest = "";
      state.isFind = false;
    },
    setUser(state, payload) {
      state.items = payload;
    },
    finded(state, payload) {
      state.findedPerson = payload;
    },
    reloadUI(state) {
      console.log(state.deleteItem);
    },
    isShowing(state) {
      state.isShow === true ? (state.isShow = false) : (state.isShow = true);
    },
    rowClick(state, el) {
      // if (state.selected.includes(el)) {
      //   state.selected.splice(el, 1);
      // } else {
      //   state.selected.push(el);
      // }

      if (state.selected.includes(el) != el) {
        state.selected.splice(0, 1);
        state.selected.push(el);
      }
      state.selected.forEach((el) => {
        state.deleteItem = el.id;
      });
    },
    actionsChange(_, el) {
      if (el === "Удалить") {
        this.dispatch("deleteUsers");
      }
      if (el === "Изменить") {
        alert(1);
      }
      if (el === "Добавить") {
        alert(3);
      }
    },
  },

  actions: {
    getUsers(context) {
      axios
        .get("https://retoolapi.dev/1KJKFH/data")
        .then((response) => context.commit("setUser", response.data));
    },
    deleteUsers(state) {
      axios
        .delete(`https://retoolapi.dev/1KJKFH/data/${state.getters.getId}`)
        .then(() => {
          alert("Deleted");
        })
        .catch((error) => console.log(error));
    },
    findUsers(context) {
      this.commit("isShowingSearch");
      // if (!this.getters.takeInfo.fName) {
      //   return;
      // }
      axios
        .get(
          `${
            this.getters.takeInfo.fName
              ? "//retoolapi.dev/1KJKFH/data?firstName=" +
                this.getters.takeInfo.fName
              : this.getters.takeInfo.lName
              ? "//retoolapi.dev/1KJKFH/data?lastName=" +
                this.getters.takeInfo.lName
              : this.getters.takeInfo.company
              ? "//retoolapi.dev/1KJKFH/data?company=" +
                this.getters.takeInfo.company
              : this.getters.takeInfo.jobTitle
              ? "//retoolapi.dev/1KJKFH/data?jobTitle=" +
                this.getters.takeInfo.jobTitle
              : this.getters.takeInfo.phone
              ? "//retoolapi.dev/1KJKFH/data?phone=" +
                this.getters.takeInfo.phone
              : this.getters.takeInfo.email
              ? "//retoolapi.dev/1KJKFH/data?email=" +
                this.getters.takeInfo.email
              : this.getters.takeInfo.interest
              ? "//retoolapi.dev/1KJKFH/data?interests=" +
                this.getters.takeInfo.interest
              : "//retoolapi.dev/1KJKFH/data"
          }`
        )
        .then((response) => context.commit("finded", response.data)) ||
        axios
          .get(
            `${
              this.getters.takeInfo.lName
                ? "//retoolapi.dev/1KJKFH/data?lastName=" +
                  this.getters.takeInfo.lName
                : this.getters.takeInfo.lName
            }`
          )
          .then((response) => context.commit("finded", response.data));
    },
  },
});
