import unittest

from support import run_solution


class ShuffleString2Test(unittest.TestCase):
    def test_case_01_abc_and_xyz(self):
        """abc and xyz."""
        result = run_solution('shuffle-string-2', 'abc\nxyz\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ayc\n')

    def test_case_02_hello_and_world(self):
        """hello and world."""
        result = run_solution('shuffle-string-2', 'hello\nworld\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'hollo\n')


if __name__ == "__main__":
    unittest.main()
