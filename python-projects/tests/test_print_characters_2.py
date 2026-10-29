import unittest

from support import run_solution


class PrintCharacters2Test(unittest.TestCase):
    def test_case_01_65_to_69(self):
        """65 to 69."""
        result = run_solution('print-characters-2', '65\n69\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A\nB\nC\nD\nE\n')

    def test_case_02_97_to_100(self):
        """97 to 100."""
        result = run_solution('print-characters-2', '97\n100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a\nb\nc\nd\n')


if __name__ == "__main__":
    unittest.main()
