import unittest

from support import run_solution


class DiamondCrystalTest(unittest.TestCase):
    def test_case_01_3(self):
        """N = 3."""
        result = run_solution('diamond-crystal', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  /\\ \n /  \\ \n/    \\ \n\\    /\n \\  /\n  \\/\n')

    def test_case_02_2(self):
        """N = 2."""
        result = run_solution('diamond-crystal', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, ' /\\ \n/  \\ \n\\  /\n \\/\n')


if __name__ == "__main__":
    unittest.main()
