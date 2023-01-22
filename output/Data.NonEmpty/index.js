// Generated by purs version 0.15.7
import * as Control_Alt from "../Control.Alt/index.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Plus from "../Control.Plus/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_FoldableWithIndex from "../Data.FoldableWithIndex/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_FunctorWithIndex from "../Data.FunctorWithIndex/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Semigroup_Foldable from "../Data.Semigroup.Foldable/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_Traversable from "../Data.Traversable/index.js";
import * as Data_TraversableWithIndex from "../Data.TraversableWithIndex/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Unfoldable from "../Data.Unfoldable/index.js";
var map = /* #__PURE__ */ Data_Functor.map(Data_Tuple.functorTuple);
var map1 = /* #__PURE__ */ Data_Functor.map(Data_Maybe.functorMaybe);
var NonEmpty = /* #__PURE__ */ (function () {
    function NonEmpty(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    NonEmpty.create = function (value0) {
        return function (value1) {
            return new NonEmpty(value0, value1);
        };
    };
    return NonEmpty;
})();
var unfoldable1NonEmpty = function (dictUnfoldable) {
    var unfoldr = Data_Unfoldable.unfoldr(dictUnfoldable);
    return {
        unfoldr1: function (f) {
            return function (b) {
                return Data_Tuple.uncurry(NonEmpty.create)(map(unfoldr(map1(f)))(f(b)));
            };
        }
    };
};
var tail = function (v) {
    return v.value1;
};
var singleton = function (dictPlus) {
    var empty = Control_Plus.empty(dictPlus);
    return function (a) {
        return new NonEmpty(a, empty);
    };
};
var showNonEmpty = function (dictShow) {
    var show = Data_Show.show(dictShow);
    return function (dictShow1) {
        var show1 = Data_Show.show(dictShow1);
        return {
            show: function (v) {
                return "(NonEmpty " + (show(v.value0) + (" " + (show1(v.value1) + ")")));
            }
        };
    };
};
var semigroupNonEmpty = function (dictApplicative) {
    var pure = Control_Applicative.pure(dictApplicative);
    return function (dictSemigroup) {
        var append1 = Data_Semigroup.append(dictSemigroup);
        return {
            append: function (v) {
                return function (v1) {
                    return new NonEmpty(v.value0, append1(v.value1)(append1(pure(v1.value0))(v1.value1)));
                };
            }
        };
    };
};
var oneOf = function (dictAlternative) {
    var alt = Control_Alt.alt((dictAlternative.Plus1()).Alt0());
    var pure = Control_Applicative.pure(dictAlternative.Applicative0());
    return function (v) {
        return alt(pure(v.value0))(v.value1);
    };
};
var head = function (v) {
    return v.value0;
};
var functorNonEmpty = function (dictFunctor) {
    var map2 = Data_Functor.map(dictFunctor);
    return {
        map: function (f) {
            return function (m) {
                return new NonEmpty(f(m.value0), map2(f)(m.value1));
            };
        }
    };
};
var functorWithIndex = function (dictFunctorWithIndex) {
    var mapWithIndex = Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex);
    var functorNonEmpty1 = functorNonEmpty(dictFunctorWithIndex.Functor0());
    return {
        mapWithIndex: function (f) {
            return function (v) {
                return new NonEmpty(f(Data_Maybe.Nothing.value)(v.value0), mapWithIndex(function ($245) {
                    return f(Data_Maybe.Just.create($245));
                })(v.value1));
            };
        },
        Functor0: function () {
            return functorNonEmpty1;
        }
    };
};
var fromNonEmpty = function (f) {
    return function (v) {
        return f(v.value0)(v.value1);
    };
};
var foldableNonEmpty = function (dictFoldable) {
    var foldMap = Data_Foldable.foldMap(dictFoldable);
    var foldl = Data_Foldable.foldl(dictFoldable);
    var foldr = Data_Foldable.foldr(dictFoldable);
    return {
        foldMap: function (dictMonoid) {
            var append1 = Data_Semigroup.append(dictMonoid.Semigroup0());
            var foldMap1 = foldMap(dictMonoid);
            return function (f) {
                return function (v) {
                    return append1(f(v.value0))(foldMap1(f)(v.value1));
                };
            };
        },
        foldl: function (f) {
            return function (b) {
                return function (v) {
                    return foldl(f)(f(b)(v.value0))(v.value1);
                };
            };
        },
        foldr: function (f) {
            return function (b) {
                return function (v) {
                    return f(v.value0)(foldr(f)(b)(v.value1));
                };
            };
        }
    };
};
var foldableWithIndexNonEmpty = function (dictFoldableWithIndex) {
    var foldMapWithIndex = Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex);
    var foldlWithIndex = Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex);
    var foldrWithIndex = Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex);
    var foldableNonEmpty1 = foldableNonEmpty(dictFoldableWithIndex.Foldable0());
    return {
        foldMapWithIndex: function (dictMonoid) {
            var append1 = Data_Semigroup.append(dictMonoid.Semigroup0());
            var foldMapWithIndex1 = foldMapWithIndex(dictMonoid);
            return function (f) {
                return function (v) {
                    return append1(f(Data_Maybe.Nothing.value)(v.value0))(foldMapWithIndex1(function ($246) {
                        return f(Data_Maybe.Just.create($246));
                    })(v.value1));
                };
            };
        },
        foldlWithIndex: function (f) {
            return function (b) {
                return function (v) {
                    return foldlWithIndex(function ($247) {
                        return f(Data_Maybe.Just.create($247));
                    })(f(Data_Maybe.Nothing.value)(b)(v.value0))(v.value1);
                };
            };
        },
        foldrWithIndex: function (f) {
            return function (b) {
                return function (v) {
                    return f(Data_Maybe.Nothing.value)(v.value0)(foldrWithIndex(function ($248) {
                        return f(Data_Maybe.Just.create($248));
                    })(b)(v.value1));
                };
            };
        },
        Foldable0: function () {
            return foldableNonEmpty1;
        }
    };
};
var traversableNonEmpty = function (dictTraversable) {
    var sequence = Data_Traversable.sequence(dictTraversable);
    var traverse = Data_Traversable.traverse(dictTraversable);
    var functorNonEmpty1 = functorNonEmpty(dictTraversable.Functor0());
    var foldableNonEmpty1 = foldableNonEmpty(dictTraversable.Foldable1());
    return {
        sequence: function (dictApplicative) {
            var Apply0 = dictApplicative.Apply0();
            var apply = Control_Apply.apply(Apply0);
            var map2 = Data_Functor.map(Apply0.Functor0());
            var sequence1 = sequence(dictApplicative);
            return function (v) {
                return apply(map2(NonEmpty.create)(v.value0))(sequence1(v.value1));
            };
        },
        traverse: function (dictApplicative) {
            var Apply0 = dictApplicative.Apply0();
            var apply = Control_Apply.apply(Apply0);
            var map2 = Data_Functor.map(Apply0.Functor0());
            var traverse1 = traverse(dictApplicative);
            return function (f) {
                return function (v) {
                    return apply(map2(NonEmpty.create)(f(v.value0)))(traverse1(f)(v.value1));
                };
            };
        },
        Functor0: function () {
            return functorNonEmpty1;
        },
        Foldable1: function () {
            return foldableNonEmpty1;
        }
    };
};
var traversableWithIndexNonEmpty = function (dictTraversableWithIndex) {
    var traverseWithIndex = Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex);
    var functorWithIndex1 = functorWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
    var foldableWithIndexNonEmpty1 = foldableWithIndexNonEmpty(dictTraversableWithIndex.FoldableWithIndex1());
    var traversableNonEmpty1 = traversableNonEmpty(dictTraversableWithIndex.Traversable2());
    return {
        traverseWithIndex: function (dictApplicative) {
            var Apply0 = dictApplicative.Apply0();
            var apply = Control_Apply.apply(Apply0);
            var map2 = Data_Functor.map(Apply0.Functor0());
            var traverseWithIndex1 = traverseWithIndex(dictApplicative);
            return function (f) {
                return function (v) {
                    return apply(map2(NonEmpty.create)(f(Data_Maybe.Nothing.value)(v.value0)))(traverseWithIndex1(function ($249) {
                        return f(Data_Maybe.Just.create($249));
                    })(v.value1));
                };
            };
        },
        FunctorWithIndex0: function () {
            return functorWithIndex1;
        },
        FoldableWithIndex1: function () {
            return foldableWithIndexNonEmpty1;
        },
        Traversable2: function () {
            return traversableNonEmpty1;
        }
    };
};
var foldable1NonEmpty = function (dictFoldable) {
    var foldl = Data_Foldable.foldl(dictFoldable);
    var foldr = Data_Foldable.foldr(dictFoldable);
    var foldableNonEmpty1 = foldableNonEmpty(dictFoldable);
    return {
        foldMap1: function (dictSemigroup) {
            var append1 = Data_Semigroup.append(dictSemigroup);
            return function (f) {
                return function (v) {
                    return foldl(function (s) {
                        return function (a1) {
                            return append1(s)(f(a1));
                        };
                    })(f(v.value0))(v.value1);
                };
            };
        },
        foldr1: function (f) {
            return function (v) {
                return Data_Maybe.maybe(v.value0)(f(v.value0))(foldr(function (a1) {
                    var $250 = Data_Maybe.maybe(a1)(f(a1));
                    return function ($251) {
                        return Data_Maybe.Just.create($250($251));
                    };
                })(Data_Maybe.Nothing.value)(v.value1));
            };
        },
        foldl1: function (f) {
            return function (v) {
                return foldl(f)(v.value0)(v.value1);
            };
        },
        Foldable0: function () {
            return foldableNonEmpty1;
        }
    };
};
var foldl1 = function (dictFoldable) {
    return Data_Semigroup_Foldable.foldl1(foldable1NonEmpty(dictFoldable));
};
var eqNonEmpty = function (dictEq1) {
    var eq1 = Data_Eq.eq1(dictEq1);
    return function (dictEq) {
        var eq = Data_Eq.eq(dictEq);
        var eq11 = eq1(dictEq);
        return {
            eq: function (x) {
                return function (y) {
                    return eq(x.value0)(y.value0) && eq11(x.value1)(y.value1);
                };
            }
        };
    };
};
var ordNonEmpty = function (dictOrd1) {
    var compare1 = Data_Ord.compare1(dictOrd1);
    var eqNonEmpty1 = eqNonEmpty(dictOrd1.Eq10());
    return function (dictOrd) {
        var compare = Data_Ord.compare(dictOrd);
        var compare11 = compare1(dictOrd);
        var eqNonEmpty2 = eqNonEmpty1(dictOrd.Eq0());
        return {
            compare: function (x) {
                return function (y) {
                    var v = compare(x.value0)(y.value0);
                    if (v instanceof Data_Ordering.LT) {
                        return Data_Ordering.LT.value;
                    };
                    if (v instanceof Data_Ordering.GT) {
                        return Data_Ordering.GT.value;
                    };
                    return compare11(x.value1)(y.value1);
                };
            },
            Eq0: function () {
                return eqNonEmpty2;
            }
        };
    };
};
var eq1NonEmpty = function (dictEq1) {
    var eqNonEmpty1 = eqNonEmpty(dictEq1);
    return {
        eq1: function (dictEq) {
            return Data_Eq.eq(eqNonEmpty1(dictEq));
        }
    };
};
var ord1NonEmpty = function (dictOrd1) {
    var ordNonEmpty1 = ordNonEmpty(dictOrd1);
    var eq1NonEmpty1 = eq1NonEmpty(dictOrd1.Eq10());
    return {
        compare1: function (dictOrd) {
            return Data_Ord.compare(ordNonEmpty1(dictOrd));
        },
        Eq10: function () {
            return eq1NonEmpty1;
        }
    };
};
export {
    NonEmpty,
    singleton,
    foldl1,
    fromNonEmpty,
    oneOf,
    head,
    tail,
    showNonEmpty,
    eqNonEmpty,
    eq1NonEmpty,
    ordNonEmpty,
    ord1NonEmpty,
    functorNonEmpty,
    functorWithIndex,
    foldableNonEmpty,
    foldableWithIndexNonEmpty,
    traversableNonEmpty,
    traversableWithIndexNonEmpty,
    foldable1NonEmpty,
    unfoldable1NonEmpty,
    semigroupNonEmpty
};