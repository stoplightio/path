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
  / protocol:RemoteProtocol origin:Origin root:ImplicitRoot {
    return {
      protocol,
      implicitProtocol: false,
      origin,
      absolute: true,
      ...root,
      path: [],
      base: ''
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

  ImplicitRoot
    = "" {
      return {
        drive: null
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
      base,
    }
  }

PathSeq
  = head:Directory Sep tail:PathSeq { return [head, ...tail] }
  / head:Directory { return [head] }

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
  = [^/\\]
