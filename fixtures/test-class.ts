class Foo {
	  greet() {
		  	    console.log("Greetings from Foo");
	  }

	  constructor() {
		    this.name = "FooInstance";
	  }

	  private readonly name: string;

	  get support() {
		  return this.name !== "FooInstance";
	  }
}

export default Foo;
