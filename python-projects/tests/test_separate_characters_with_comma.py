import unittest

from support import run_solution


class SeparateCharactersWithCommaTest(unittest.TestCase):
    def test_case_01_abc(self):
        """abc."""
        result = run_solution('separate-characters-with-comma', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a,b,c\n')

    def test_case_02_ello(self):
        """Hello."""
        result = run_solution('separate-characters-with-comma', 'Hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'H,e,l,l,o\n')


if __name__ == "__main__":
    unittest.main()
