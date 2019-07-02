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
      origin,
      absolute: true,
      ...root,
      ...path
    }
  }
  / protocol:RemoteProtocol origin:Origin root:ImplicitRoot {
    return {
      protocol,
      origin,
      absolute: true,
      ...root,
      path: []
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
      protocol: null,
      origin: null,
      absolute: false,
      drive: null,
      ...path
    }
  }

PathWrapper
  = path:PathSeq {
    return {
      path,
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
