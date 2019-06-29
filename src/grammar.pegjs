// Filepath Parsing Grammar
// ==========================
//
// Paste into https://pegjs.org/online

Path
  = RemotePath
  / FileSchemaPath
  / AbsolutePath
  / RelativePath

RemotePath
  = protocol:RemoteProtocol origin:Origin root:PosixRoot path:PathWrapper {
    return {
      protocol,
      implicitProtocol: false,
      origin,
      absolute: true,
      ...root,
      ...path
    }
  }

  RemoteProtocol
    = HttpProtocol
    / HttpsProtocol

    HttpProtocol
      = raw:"http://"i {
      return 'http'
    }
    
    HttpsProtocol
      = raw:"https://"i {
      return 'https'
    } 
    
  Origin
    = $ NotSep+
    / "" { return null }

FileSchemaPath
  = protocol:FileProtocol root:Root path:PathWrapper {
    return {
      protocol,
      implicitProtocol: false,
      origin: null,
      absolute: true,
      ...root,
      ...path
    }
  }

  FileProtocol
    = raw:("file://"i / "file:"i) {
    return 'file'
  }

AbsolutePath
  = root:Root path:PathWrapper {
  return {
    protocol: 'file',
    implicitProtocol: true,
    origin: null,
    absolute: true,
    ...root,
    ...path
  }
}

  Root
    = PosixRoot
    / WindowsRoot

    PosixRoot
      = Sep {
        return {
          drive: null
        }
      }

    WindowsRoot
      = drive:[A-Za-z] ":" Sep {
        return {
          drive: drive.toLowerCase() + ':'
        }
      }

RelativePath
  = Cwd path:PathWrapper {
    return {
      protocol: 'file',
      implicitProtocol: true,
      origin: null,
      absolute: false,
      drive: null,
      ...path
    }
  }

PathWrapper
  = path:PathSeq {
    let base = path.pop();
    return {
      path,
      ...base
    }
  }

PathSeq
  = '\n' { return [ "" ] }
  / base:Base '\n' { return [ base ] }
  / head:Directory Sep tail:PathSeq { return [head, ...tail] }

Cwd
  = ExplicitCwd
  / ImplicitCwd

Directory
  = $ NotSep+
  / ""

ExplicitCwd
  = "." Sep

ImplicitCwd
  = ""

Sep
  = "/"
  / "\\"

NotSep
  = [^/\\\n]

Base
  = base:StartWithDotWord Dot ext:PseudoExt {
    return {
      basename: ext.base !== null ? base + '.' + ext.base : base,
      ext: ext.ext
    }
  }
  / base:NotDotWord Dot ext:PseudoExt {
    return {
      basename: ext.base !== null ? base + '.' + ext.base : base,
      ext: ext.ext
    }
  }
  / basename:StartWithDotWord { return { basename, ext: null } }
  / basename:NotDotWord { return { basename, ext: null } }
  / basename:OnlyDotWord { return { basename, ext: null } }

PseudoExt
  = base:(NotDotWord / "") Dot ext:PseudoExt {
    return {
      base: ext.base !== null ? base + '.' + ext.base : base,
      ext: ext.ext
    }
  }
  / ext:(NotDotWord / "") { return { base: null, ext } }

Ext
  = Dot ext:NotDot+ { return ext }

Dot
  = "."
  
NotDot
  = [^/\\\n\.]

NotDotWord
  = $ NotDot+

StartWithDotWord
  = $(Dot+ NotDotWord)

OnlyDotWord
  = $ Dot+
