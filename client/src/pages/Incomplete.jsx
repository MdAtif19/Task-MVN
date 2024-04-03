import React from "react";
import { Link } from "react-router-dom";

const Incomplete = () => {
  return (
    <>
      <header className="flex justify-between items-center px-10 py-5 bg-slate-500">
        <div>
          <a href="/">Logo</a>
        </div>
        <nav>
          <div className="flex gap-5 ">
            <ul>
              <Link to="/all-tasks">All Task</Link>
            </ul>
            <ul>
              <Link to="/completed">completed</Link>
            </ul>
            <ul>
              <Link to="/incomplete">Incomplete</Link>
            </ul>
          </div>
        </nav>
      </header>
      <section>
        <h1>Incomplete Task Here</h1>
      </section>
    </>
  );
};

export default Incomplete;
