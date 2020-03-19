import {
  decrementInventory,
  getBike,
  incrementInventory
} from "./utils/inventory";

import bikesData from "./data";

export default {
  name: "app",
  data() {
    return {
      bikes: bikesData,
      renderDemo: false
    };
  },
  computed: {
    bikeImages() {
      return this.bikes.map(({ bikeImage }) => bikeImage);
    },
    buttonColor() {
      return this.renderDemo ? "red" : "green";
    },
    buttonText() {
      return this.renderDemo ? "Hide" : "Render";
    },
    demoBike() {
      return this.bikes[0];
    }
  },
  methods: {
    decrementInventory,
    getBike,
    incrementInventory
  },
  mounted() {
    this.bikes.forEach(bike => {
      bike.decrement = this.decrementInventory(bike.id);
      bike.increment = this.incrementInventory(bike.id);
    });
  },
  components: { }
};
