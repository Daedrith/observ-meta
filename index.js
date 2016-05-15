import observ from 'observ';

function MetaObserv(nestedObs)
{
  if (typeof nestedObs !== 'function' || typeof nestedObs.set !== 'function')
  {
    nestedObs = observ(nestedObs);
  }

  let obs = observ();
  let obsobs = observ();
  obsobs[MetaObserv.isMetaObserv] = true;

  let dispose;
  let setObs = obsobs.set.bind(obsobs);
  obsobs.set = function(o)
  {
    if (dispose) dispose();

    setObs(o);
    obs.set(o());
    dispose = o(v => obs.set(v));
  };

  obsobs.set(nestedObs);

  return { obs, obsobs };
};

MetaObserv.isMetaObserv = Symbol();

export default MetaObserv;
export var __useDefault = true;